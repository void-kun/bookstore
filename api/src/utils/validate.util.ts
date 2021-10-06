import { check, ValidationChain } from 'express-validator';
import { IsStrongPasswordOptions } from 'express-validator/src/options';
import message from '../data/message.json';

const loginValidate = (): ValidationChain[] => [
  check('email')
    .not()
    .isEmpty()
    .withMessage(message.auth.error.error001)
    .bail()
    .isEmail()
    .withMessage(message.auth.error.error002),
  check('password')
    .isStrongPassword({
      minLength: 6,
      minSymbols: 1,
      minUppercase: 1,
    } as IsStrongPasswordOptions)
    .withMessage(message.auth.error.error003),
];

const registerValidate = (): ValidationChain[] => [
  check('email')
    .not()
    .isEmpty()
    .withMessage(message.auth.error.error001)
    .bail()
    .isEmail()
    .withMessage(message.auth.error.error002),
  check('password')
    .isStrongPassword({
      minLength: 6,
      minSymbols: 1,
      minUppercase: 1,
    } as IsStrongPasswordOptions)
    .withMessage(message.auth.error.error003),
];

export { loginValidate, registerValidate };
