import type { NextFunction, Request, Response } from 'express';
import type { ErrorObj } from '../interface/ErrorObj.js';
export const errorHandler = (
  err: ErrorObj,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(err.statusCode || 500)
    .json({ message: err.message, success: err.success, data: req.body });
};
