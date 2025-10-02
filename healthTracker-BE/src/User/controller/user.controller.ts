import type { NextFunction, Request, Response } from 'express';
import { BaseController } from '../../base/controller/BaseController.js';
import { User } from '../models/User.js';
import type { UserService } from '../service/user.service.js';
import {
  generateGenericError,
  setCookie,
  setGenericResponse,
} from '../../utils/loginUtil.js';
import type { ErrorObj } from '../../interface/ErrorObj.js';

export class UserController extends BaseController<User> {
  constructor(public service: UserService) {
    super(service, User);
  }
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const cookie = await this.service.login(email, password);
      setCookie(res, 'authToken', cookie);
      setGenericResponse([], 200, res);
    } catch (err) {
      const errorObj: ErrorObj = generateGenericError(err, 400);
      next(errorObj);
    }
  };
}
