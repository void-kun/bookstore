import { Request, Response, NextFunction } from 'express';
import { getRepository, getConnection } from 'typeorm';
import { validationResult } from 'express-validator';
import { Account, User } from '../entities';
import { AAuthController } from './types/auth.type';
import { HTTP_CODE } from '../utils/constant.util';
import jwt from 'jsonwebtoken';
import defaultData from '../data/default.json';
import message from '../data/message.json';
import { jwtConfig } from '../utils/config.util';
import { redisClient } from '../utils/redis.util';

/**
 * Class handle authentication (login/ register / logout)
 */
class AuthController extends AAuthController {
  /**
   * Handle login control
   *
   * @param req: Request
   * @param res: Response
   * @param next: NextFunction
   */
  static login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email, password } = req?.body;
    const errorList = validationResult(req);
    if (!errorList.isEmpty()) {
      res.status(HTTP_CODE.BAD_REQUEST).json(errorList);
      return next();
    }

    const accountRepo = getRepository(Account);
    let account: Account;
    try {
      account = await accountRepo.findOneOrFail({ email: email });
    } catch (error) {
      res.status(HTTP_CODE.UNAUTHORIZED).json(message.auth.error.loginError002);
      return next(error);
    }

    if (!account.checkPasswordIsValid(password)) {
      res.status(HTTP_CODE.UNAUTHORIZED).json(message.auth.error.loginError002);
      return next(new Error(message.auth.devError.loginError001));
    }

    const accessToken = jwt.sign({ sub: account.id }, jwtConfig.accessSecret, {
      expiresIn: jwtConfig.accessTime,
    });
    const refreshToken = generateRefreshToken(account.id);
    res.status(HTTP_CODE.SUCCESS).json({
      status: true,
      message: message.auth.success.loginSuccess001,
      data: { accessToken, refreshToken },
    });
    return next();
  };

  /**
   * Handle register control
   *
   * @param req: Request
   * @param res: Response
   * @param next: NextFunction
   */
  static register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email, password } = req?.body;
    const errorList = validationResult(req);
    if (!errorList.isEmpty()) {
      res.status(HTTP_CODE.BAD_REQUEST).json(errorList);
      return next();
    }

    const accountRepo = getRepository(Account);
    try {
      const account = await accountRepo.findOne({ email: email });
      if (account) throw new Error(message.auth.error.registerError002);
    } catch (error) {
      res.status(HTTP_CODE.BAD_REQUEST).json({ message: error.message });
      return next(error);
    }

    await getConnection().manager.transaction(async (entityManager) => {
      try {
        const user: User = new User();
        user.avatar = defaultData.avatar;
        await entityManager.save(user);

        const account: Account = new Account();
        account.user = user;
        account.username = email;
        account.email = email;
        account.hash = password;
        await entityManager.save(account);
      } catch (error) {
        return next(new Error(error));
      }
    });

    res.json({ message: message.auth.success.registerSuccess001 });
    return next();
  };
}

// const GetAccessToken = (req: Request, res: Response): any => {
//   const id = req.userData.sub;
//   const access_token = jwt.sign(
//     { sub: id },
//     process.env.JWT_ACCESS_SECRET,
//     { expiresIn: process.env.JWT_ACCESS_TIME }
//   );
//   const refresh_token = generateRefreshToken(id);
//   return res.json({
//     status: true,
//     message: 'success',
//     data: { access_token, refresh_token },
//   });
// };

const generateRefreshToken = (id: string | number): string => {
  const refreshToken = jwt.sign({ sub: id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_TIME,
  });

  redisClient.get(id.toString(), (error) => {
    if (error) throw error;

    redisClient.set(id.toString(), JSON.stringify({ token: refreshToken }));
  });

  return refreshToken;
};

export default AuthController;
