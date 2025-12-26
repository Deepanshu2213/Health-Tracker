import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import { User } from '../User/models/User.js';
import {
  createGenericToken,
  generateGenericError,
  setCookie,
} from '../utils/loginUtil.js';
import type { ErrorObj } from '../interface/ErrorObj.js';

interface tokenPayload {
  id?: string;
  email?: string;
}
export const chechAuthParams = async (
  req: Request,
  res: Response
): Promise<tokenPayload | undefined> => {
  const token = req.query?.token;
  let user: tokenPayload | undefined;
  if (token) {
    user = await verifyToken(token as string);
    if (user) {
      setCookie(res, 'authToken', token);
    }
  }
  return user;
};
export const verifyToken = async (authToken: string): Promise<tokenPayload> => {
  const user = await new Promise<tokenPayload>((resolve, reject) => {
    jwt.verify(
      authToken,
      'this is secret key',
      (err: Object | null, decoded: Object | undefined) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded as tokenPayload);
        }
      }
    );
  });
  return user;
};
export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookie = req.cookies;
    const authToken = cookie && cookie.authToken;
    let user: tokenPayload | undefined;
    if (!authToken) {
      user = await chechAuthParams(req, res);
    } else {
      user = await verifyToken(authToken);
    }
    if (user && user.id) {
      const orignalUser = await User.findOne({ where: { id: user.id } });
      if (!orignalUser) {
        throw Error('Please provide correct token or login again');
      } else {
        (req as Request & { user: User }).user = orignalUser;
        next();
      }
    } else {
      throw Error('Please login to Continue');
    }
  } catch (err) {
    const errorObj: ErrorObj = generateGenericError(err, 400);
    next(errorObj);
  }
};
