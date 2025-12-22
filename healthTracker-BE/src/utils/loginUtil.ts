import { Document } from 'mongoose';
import type { Response } from 'express';
import jwt from 'jsonwebtoken';
import type { IUser } from '../old/models/User.js';
import type { ResponseObj } from '../interface/ResponseObj.js';
import type { ErrorObj } from '../interface/ErrorObj.js';
import type { Model } from 'sequelize';
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
export const createGenericToken = <T extends Model>(entity: T) => {
  return jwt.sign(entity.toJSON(), 'this is secret key', {
    expiresIn: 60 * 60 * 5,
  });
};
export const setCookie = (res: Response, key: string, value: any) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie(key, value, {
    maxAge: 1000 * 60 * 60 * 5,
    httpOnly: true,
    secure: isProd, // false locally, true in prod
    sameSite: isProd ? 'none' : 'lax',
  });
};

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

export const generateGenericError = (err: any, statusCode: number) => {
  let errObj: ErrorObj = generateDefaultObj(statusCode);
  if (typeof err == 'string') {
    errObj = generateErrorFromMsg(err, statusCode);
  } else if (err instanceof Error) {
    errObj = generateError(err, statusCode);
  }
  return errObj;
};
const generateDefaultObj = (statusCode: number): ErrorObj => {
  const errObj: ErrorObj = new Error();
  errObj.success = false;
  errObj.statusCode = statusCode;
  errObj.message = 'Oops unexepect issue we looking into it';
  return errObj;
};
const generateErrorFromMsg = (msg: string, statusCode: number): ErrorObj => {
  const err: ErrorObj = new Error();
  err.success = false;
  err.statusCode = statusCode;
  err.message = msg;
  return err;
};
const generateError = (err: Error, statusCode: number): ErrorObj => {
  const errObj: ErrorObj = err;
  errObj.success = false;
  errObj.statusCode = statusCode;
  return err;
};
export const setGenericResponse = <T extends Model>(
  model: T[],
  status: number,
  res: Response
) => {
  const obj = genericResponseObject<T>(model);
  res.status(status).json(obj);
};

export const genericResponseObject = <T extends Model>(
  models: T[],
  error?: string[] | undefined
): ResponseObj<T> => {
  return {
    success: true,
    data: models,
    error: error,
  };
};

export const setGenericAnalyticsResponse = <E extends Model>(
  data: { [key: string]: E[] },
  res: Response,
  status: number
) => {
  const resp = {
    data: data,
    success: true,
  };
  res.status(status).json(resp);
};
