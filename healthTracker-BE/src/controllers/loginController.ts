import type { IUser } from '../models/User.js';
import { User } from '../models/User.js';
import type { Request, Response, NextFunction } from 'express';
import { createToken, setCookie, setResponse } from '../utils/loginUtil.js';

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
    next(err);
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
    next(err);
  }
};
