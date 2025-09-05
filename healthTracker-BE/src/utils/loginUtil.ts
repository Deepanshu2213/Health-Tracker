import { Document } from 'mongoose';
import type { Response } from 'express';
import jwt from 'jsonwebtoken';
import type { IUser } from '../models/User.js';
export const setResponse = (
  model: Document[],
  status: number,
  res: Response
) => {
  const response = generateResponseObj(model);
  res.status(status).json(response);
};
export const createToken = (user: IUser): string => {
  return jwt.sign(user.toJSON(), 'this is secret key', {
    expiresIn: 60 * 60 * 5,
  });
};
export const setCookie = (res: Response, key: string, value: any) => {
  res.cookie(key, value, { maxAge: 1000 * 60 * 60 * 5 });
};
interface ResponseObj<T> {
  success?: boolean;
  data?: T[];
  error?: string[] | undefined;
}
export const generateResponseObj = (
  models: Document[],
  error?: string[]
): ResponseObj<Document> => {
  return {
    success: true,
    data: models,
    error: error,
  };
};
