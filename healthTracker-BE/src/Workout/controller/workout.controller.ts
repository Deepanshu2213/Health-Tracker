import { Op, type ModelStatic } from 'sequelize';
import { BaseController } from '../../base/controller/BaseController.js';
import type { BaseServiceInterface } from '../../base/interface/BaseServiceInterface.js';
import type { Workout } from '../models/Workout.js';
import type { Request, Response, NextFunction } from 'express';
import {
  generateGenericError,
  setGenericResponse,
} from '../../utils/loginUtil.js';
import type { ErrorObj } from '../../interface/ErrorObj.js';

export class WorkoutController extends BaseController<Workout> {
  constructor(
    public service: BaseServiceInterface<Workout>,
    public model: ModelStatic<Workout>
  ) {
    super(service, model);
  }
  saveEntity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const body: Workout = req.body;
      body.userId = (req as any).user.id;
      const workout = await this.service.saveEntity(body);
      setGenericResponse([workout], 200, res);
    } catch (err) {
      const errorObj: ErrorObj = generateGenericError(err, 400);
      next(errorObj);
    }
  };
  getCurrentWorkout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let dayParam = req.query.day;
      if (!dayParam) {
        const startDate = new Date();
        const endDate = new Date();
        startDate.setDate(startDate.getDate() - 1);
        const rec = await this.getWorkoutInRange(startDate, endDate);
        setGenericResponse(rec, 200, res);
      } else {
        let day = parseInt(dayParam as string);
        const currentDate = new Date();
        const currentDay = currentDate.getDay();
        if (day <= currentDay) {
          currentDate.setDate(currentDate.getDate() - (currentDay - day));
        } else {
          currentDate.setDate(currentDate.getDate() - currentDay);
          currentDate.setDate(currentDate.getDate() - (7 - day));
        }
        let rec = await this.getWorkoutInRange(
          currentDate,
          new Date(currentDate)
        );
        setGenericResponse(rec, 200, res);
      }
    } catch (err) {
      const errorObj: ErrorObj = generateGenericError(err, 400);
      next(errorObj);
    }
  };
  getWorkoutInRange = async (
    startDate: Date,
    endDate: Date
  ): Promise<Workout[]> => {
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 59);
    const recordInRange = await this.service.getAllEntity({
      where: {
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      include: { all: true, nested: true },
      order: [['createdAt', 'DESC']],
    });
    return recordInRange;
  };
}
