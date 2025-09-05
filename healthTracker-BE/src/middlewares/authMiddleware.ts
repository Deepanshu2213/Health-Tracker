import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import type { Request, Response, NextFunction } from 'express';
import { error } from 'console';
export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  interface tokenPayload {
    _id?: string;
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
    if (user && user._id) {
      const orignalUser = User.findOne({ _id: user._id });
      if (!orignalUser) {
        throw Error('Please provide correct token or login again');
      } else {
        next();
      }
    } else {
      throw Error('Please login to Continue');
    }
  } catch (err) {
    next(err);
  }
};
