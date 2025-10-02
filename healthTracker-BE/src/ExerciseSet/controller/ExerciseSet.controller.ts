import type { ModelStatic } from 'sequelize';
import { BaseController } from '../../base/controller/BaseController.js';
import type { ExerciseSet } from '../models/ExerciseSet.js';
import { type ExerciseSetServiceInterface } from '../interface/ExerciseSetService.interface.js';
import type { Request, Response, NextFunction } from 'express';
import {} from '../../utils/loginUtil.js';

export class ExerciseSetController extends BaseController<ExerciseSet> {
  constructor(
    public service: ExerciseSetServiceInterface,
    public model: ModelStatic<ExerciseSet>
  ) {
    super(service, model);
  }
  getAllNested = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const data = await this.service.findAllByAssociation([
      {
        association: 'sets',
      },
    ]);
    data, 200, res;
  };
}
