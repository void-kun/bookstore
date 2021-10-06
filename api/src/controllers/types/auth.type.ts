import { Request, Response, NextFunction } from 'express';

abstract class AAuthController {
  static login: (req: Request, res: Response, next: NextFunction) => void;
  static register: (req: Request, res: Response, next: NextFunction) => void;
}

export { AAuthController };
