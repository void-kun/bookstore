import { Request, Response, NextFunction } from 'express';

abstract class AUserController {
  static get: (req: Request, res: Response, next: NextFunction) => void;
  static detail: (req: Request, res: Response, next: NextFunction) => void;
}

export { AUserController };
