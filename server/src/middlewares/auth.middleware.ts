import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../utils/config.util';
import { redisClient } from '../utils/redis.util';
import { HTTP_CODE } from './../utils/constant.util';
import message from '../data/message.json';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, jwtConfig.accessSecret);
    req.userData = decoded;
    req.token = token;

    redisClient.get(
      `BL_${decoded.sub.toString()}`,
      (error: Error, reply: string): void => {
        if (error) throw error;

        if (reply === token)
          res
            .status(HTTP_CODE.UNAUTHORIZED)
            .json({ status: false, message: message.auth.error.error004 });
        next();
      }
    );
  } catch (error) {
    res.status(HTTP_CODE.UNAUTHORIZED).json({
      status: false,
      message: message.auth.error.error005,
      data: error,
    });
  }
};

const verifyRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.body.token;

  if (token === null) {
    res
      .status(HTTP_CODE.UNAUTHORIZED)
      .json({ status: false, message: 'Invalid request.' });
    return next();
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.refreshSecret);
    req.userData = decoded;

    // verify if token is in store or not
    redisClient.get(decoded.sub.toString(), (error: Error, reply: string) => {
      if (error) throw error;

      if (reply === null)
        res.status(HTTP_CODE.UNAUTHORIZED).json({
          status: false,
          message: 'Invalid request. Token is not in store.',
        });
      if (JSON.parse(reply).token !== token)
        res.status(HTTP_CODE.UNAUTHORIZED).json({
          status: false,
          message: 'Invalid request. Token is not same in store.',
        });

      next();
    });
  } catch (error) {
    res.status(HTTP_CODE.UNAUTHORIZED).json({
      status: true,
      message: 'Your session is not valid.',
      data: error,
    });
  }
};

export { verifyToken, verifyRefreshToken };
