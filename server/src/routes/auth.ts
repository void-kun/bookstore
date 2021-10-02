import { Router } from 'express';
import { loginValidate, registerValidate } from '../utils/validate.util';
import AuthController from '../controllers/auth.controller';

const router = Router();

// login route
router.post('/login', loginValidate(), AuthController.login);
router.post('/register', registerValidate(), AuthController.register);

export default router;
