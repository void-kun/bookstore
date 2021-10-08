import { Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';
import {
    MicroframeworkLoader as Loader,
    MicroframeworkSettings as Setting,
} from 'microframework-w3tec';
import * as path from 'path';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';

import { env } from '../env';
import { getErrorCode, getErrorMessage, handlingErrors } from '../lib/graphql';

export const graphQLLoader: Loader = async (setting: Setting | undefined) => {
    if (setting && env.graphql.enabled) {
        const expressApp = setting.getData('express_app');

        const schema = await buildSchema({
            resolvers: env.app.dirs.resolvers,
            emitSchemaFile: path.resolve(__dirname, '../api', 'schema.gql'),
        });

        handlingErrors(schema);

        expressApp.use(env.graphql.route, (req: Request, res: Response) => {
            const reqId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
            const container = Container.of(reqId);
            const context = { reqId, container, req, res };
            container.set('context', context);

            graphqlHTTP({
                schema,
                context,
                graphiql: env.graphql.editor,
                formatError: (error) => ({
                    code: getErrorCode(error.message),
                    message: getErrorMessage(error.message),
                    path: error.path,
                }),
            })(req, res);
        });
    }
};
