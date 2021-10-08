import { HTTP_CODE } from './../../constants/httpConstants';
import { HttpError } from 'routing-controllers';

export class UserNotFoundError extends HttpError {
    constructor() {
        super(HTTP_CODE.NOT_FOUND, 'User not found!');
    }
}
