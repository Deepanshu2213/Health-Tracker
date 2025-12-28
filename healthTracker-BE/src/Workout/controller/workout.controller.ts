import { Op, type ModelStatic } from 'sequelize';
import { BaseController } from '../../base/controller/BaseController.js';
import type { BaseServiceInterface } from '../../base/interface/BaseServiceInterface.js';
import type { Workout } from '../models/Workout.js';
import type { Request, Response, NextFunction } from 'express';
import {
  generateGenericError,
  setGenericAnalyticsResponse,
  setGenericResponse,
} from '../../utils/loginUtil.js';
import type { ErrorObj } from '../../interface/ErrorObj.js';
import {
  WorkoutAnalytic,
  workoutDivder,
} from '../../analytics/WorkoutAnalytic.js';

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
      let customDay = req.query.customDay as string;
      if (customDay && customDay.length > 0) {
        let customStartTime = new Date(customDay);
        let customEndTime = new Date(customStartTime);
        customEndTime.setDate(customEndTime.getDate() + 1);
        customEndTime.setTime(customEndTime.getTime() - 1);
        const rec = await this.getWorkoutInRange(
          customStartTime,
          customEndTime
        );
        setGenericResponse(rec, 200, res);
      } else if (!dayParam) {
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
        currentDate.setHours(0, 0, 0, 0);
        let endDate = new Date(currentDate);
        endDate.setHours(23, 59, 59, 999);
        let rec = await this.getWorkoutInRange(currentDate, endDate);
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
  getWorkoutAnalytics = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 100);
    const workoutAnalytic = new WorkoutAnalytic(
      startDate,
      endDate,
      20,
      workoutDivder
    );
    const divideData = await workoutAnalytic.getDistributedData();
    setGenericAnalyticsResponse(divideData, res, 200);
  };
}
