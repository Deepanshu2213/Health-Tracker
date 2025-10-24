import type { NextFunction, Request, Response } from 'express';
import type { BaseServiceInterface } from '../interface/BaseServiceInterface.js';
import {
  generateGenericError,
  setGenericResponse,
} from '../../utils/loginUtil.js';
import type { Model, ModelStatic } from 'sequelize';
import type { ErrorObj } from '../../interface/ErrorObj.js';

export class BaseController<E extends Model> {
  constructor(
    public service: BaseServiceInterface<E>,
    public model: ModelStatic<E>
  ) {}
  getAllEntity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getAllEntity();
      setGenericResponse<E>(data, 200, res);
    } catch (err) {
      const errorObj: ErrorObj = generateGenericError(err, 400);
      next(errorObj);
    }
  };
  getEntityById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { id } = req.body;
      const data = await this.service.getEntityById(id as string);
      setGenericResponse<E>(data ? [data] : [], 200, res);
    } catch (err) {
      const errorObj: ErrorObj = generateGenericError(err, 400);
      next(errorObj);
    }
  };
  getEntityByIdNested = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const data = await this.service.getNestedEntityById(id as string);
      setGenericResponse(data ? [data] : [], 200, res);
    } catch (err) {
      const errorObj: ErrorObj = generateGenericError(err, 400);
      next(errorObj);
    }
  };
  saveEntity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let entityObj: E = req.body;
      const data = await this.service.saveEntity(entityObj);
      setGenericResponse<E>(data ? [data] : [], 200, res);
    } catch (err) {
      const errorObj: ErrorObj = generateGenericError(err, 400);
      next(errorObj);
    }
  };
  getAllNested = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getAllNested();
      setGenericResponse<E>(data, 200, res);
    } catch (err) {
      const errorObj: ErrorObj = generateGenericError(err, 400);
      next(errorObj);
    }
  };
}
