import { Request, Response, NextFunction } from 'express';
import { AUserController } from './types/user.type';
import { HTTP_CODE } from '../utils/constant.util';

/**
 * Class handle user
 */
class UserController extends AUserController {
  /**
   * Handle get control
   *
   * @param req: Request
   * @param res: Response
   * @param next: NextFunction
   */
  static detail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { userId } = req?.body;

    res.status(HTTP_CODE.SUCCESS).json({ message: 'data' + userId });
    return next();
  };

  /**
   * Handle get all control
   *
   * @param req: Request
   * @param res: Response
   * @param next: NextFunction
   */
  static get = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    res.status(HTTP_CODE.SUCCESS).json({ message: 'data' });
    return next();
  };
}

export default UserController;
