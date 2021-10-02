import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware';
import UserController from '../controllers/user.controller';

const router = Router();

// get list user route
router.route('/').get(verifyToken, UserController.get);
router.route('/:userId').get(verifyToken, UserController.detail);

export default router;
