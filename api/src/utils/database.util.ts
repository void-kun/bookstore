import { Connection, getConnection, createConnection } from 'typeorm';
import connectOpt from '../configs/orm.config';
import Logger from '../utils/logger.util';
import message from '../data/message.json';

export const DBConnect = async () => {
  let connection: Connection | undefined;

  try {
    connection = getConnection();
  } catch (error) {}

  try {
    if (connection) {
      if (!connection.isConnected) await connection.connect();
    } else {
      await createConnection(connectOpt);
      Logger.info(message.log.database.DBINFO001);
    }
  } catch (error) {
    Logger.error(`${message.log.database.DBERR001}\n${error}`);
    throw error;
  }
};
