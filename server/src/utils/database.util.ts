import { NextFunction } from 'express';
import { Connection, getConnection, createConnection } from 'typeorm';
import { LOG_DB_MESSAGE } from './constant.util';
import connectOpt from '../configs/orm.config';
import Logger from '../utils/logger.util';

export const DBConnect = async () => {
  let connection: Connection | undefined;

  try {
    connection = getConnection();
  } catch (error) {}

  try {
    if (connection) {
      if (!connection.isConnected) {
        await connection.connect();
      }
    } else {
      await createConnection(connectOpt);
      Logger.info(LOG_DB_MESSAGE['DBINFO001']);
    }
  } catch (error) {
    Logger.error(`${LOG_DB_MESSAGE['DBERR001']}\n${error}`);
    throw error;
  }
};

export const TryDBConnect = async (onError: Function, next?: NextFunction) => {
  try {
    await DBConnect();
    if (next) next();
  } catch (error) {
    onError();
  }
};
