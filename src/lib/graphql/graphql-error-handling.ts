import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import * as uuid from 'uuid';

import { HTTP_CODE } from '../../constants';
import { env } from '../../env';
import { Logger } from '../logger';

const logger = new Logger('app:error');

export const Processed = Symbol();

export const IsUserError = Symbol();

export class UserError extends Error {
    constructor(...args: any[]) {
        super(args[0]);

        this.name = 'Error';
        this.message = args[0];
        this[IsUserError] = true;
        Error.captureStackTrace(this);
    }
}

export let defaultHandler = (err?) => {
    if (err[IsUserError]) {
        return err;
    }

    const errId = uuid.v4();
    err.message = `${err.message}: ${errId}`;
    if (!env.isTest) {
        console.log((err && err.stack) || err);
    }
    if (env.isProduction) {
        logger.error(err);
    }
    err.message = `${HTTP_CODE.INTERNAL_SERVER_ERROR}: Internal Error: ${errId}`;
    return err;
};

const maskField = (field, fn) => {
    const resolveFn = field.resolve;
    if (field[Processed] || !resolveFn) {
        return;
    }

    field[Processed] = true;
    field.resolve = async (...args) => {
        try {
            const out = resolveFn.call(undefined, ...args);
            return await Promise.resolve(out);
        } catch (error) {
            throw fn(error);
        }
    };

    field.resolve._resolveFn = resolveFn;
};

const maskType = (type, fn) => {
    if (type[Processed] || !type.getFields) {
        return;
    }

    const fields = type.getFields();
    for (const fieldName in fields) {
        if (!Object.hasOwnProperty.call(fields, fieldName)) {
            continue;
        }
        maskField(fields[fieldName], fn);
    }
};

const maskSchema = (schema, fn) => {
    const types = schema.getTypeMap();
    for (const typeName in types) {
        if (!Object.hasOwnProperty.call(types, typeName)) {
            continue;
        }
        maskType(types[typeName], fn);
    }
};

export const setDefaultHandler = (handlerFn) => {
    defaultHandler = handlerFn;
};

export const handlingErrors = (thing, fn = defaultHandler) => {
    if (thing instanceof GraphQLSchema) {
        maskSchema(thing, fn);
    } else if (thing instanceof GraphQLObjectType) {
        maskType(thing, fn);
    } else {
        maskField(thing, fn);
    }
};

export const hasErrorCode = (error: any): boolean => {
    let message = error;
    if (error.message) {
        message = error.message;
    }
    const reg = new RegExp(/^[0-9]{3}: /);
    return reg.test(message);
};

export const getErrorCode = (message: string): string => {
    if (hasErrorCode(message)) {
        return message.substring(0, 3);
    }
    return `${HTTP_CODE.INTERNAL_SERVER_ERROR}`;
};

export const getErrorMessage = (message: string): string => {
    if (hasErrorCode(message)) {
        return message.substring(5);
    }
    return message;
};
