import type { IUser } from '../models/User.js';
import { User } from '../models/User.js';
import type { Request, Response, NextFunction } from 'express';
import {
  createToken,
  generateGenericError,
  setCookie,
  setResponse,
} from '../../utils/loginUtil.js';
import { type UserRequest } from '../../interface/UserRequest.js';
import type { ErrorObj } from '../../interface/ErrorObj.js';
export const login = async (
  req: Request<{}, {}, IUser>,
  res: Response,
  next: NextFunction
) => {
  const userModel = req.body;
  console.log(req.body);
  try {
    const dbModel = await User.login(userModel.email, userModel.password);
    const token = createToken(dbModel);
    setCookie(res, 'authToken', token);
    setResponse([dbModel], 200, res);
  } catch (err) {
    const errorObj: ErrorObj = generateGenericError(err, 400);
    next(errorObj);
  }
};
export const saveUser = async (
  req: Request<{}, {}, IUser>,
  res: Response,
  next: NextFunction
) => {
  const initUser = req.body;
  console.log(initUser);
  const user = new User(initUser);
  setResponse([user], 200, res);
  try {
    await user.save();
  } catch (err) {
    const errorObj: ErrorObj = generateGenericError(err, 400);
    next(errorObj);
  }
};

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as Request & { user: IUser }).user;
  if (!user) {
    throw Error('Please login');
  }
  setResponse([user], 200, res);
};
