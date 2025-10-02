import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import { User } from '../User/models/User.js';
import { generateGenericError } from '../utils/loginUtil.js';
import type { ErrorObj } from '../interface/ErrorObj.js';
export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  interface tokenPayload {
    id?: string;
    email?: string;
  }
  try {
    const cookie = req.cookies;
    const authToken = cookie && cookie.authToken;
    if (!authToken) {
      throw Error('Please login to Continue');
    }
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
