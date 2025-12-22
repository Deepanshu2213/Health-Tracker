import { Op, type Model } from 'sequelize';
import type { Workout } from '../Workout/models/Workout.js';
import { workoutService } from '../Workout/index.js';

interface CriteriaInterface<E, F extends keyof E> {
  yaxisDivider(): E[F][];
  xaxisDivider(ydividedRange: E[F][]): Promise<E[]>;
}
interface DataDivider<E extends Model, F extends keyof E> {
  xdividedRange: E[];
  ydividedRange: E[F][];
  divideData(
    criteria: CriteriaInterface<E, F>
  ): Promise<{ [key: string]: E[] }>;
}

interface DataDistributer<E extends Model, F extends keyof E> {
  getDistributedData(): Promise<{ [key: string]: E[] }>;
  divider: DataDivider<E, F>;
}

interface WorkAnalytics extends DataDistributer<Workout, 'createdAt'> {
  dateStart: Date;
  dateEnd: Date;
  gap: number;
}

class WorkoutDivder implements DataDivider<Workout, 'createdAt'> {
  xdividedRange: Workout[] = [];
  ydividedRange: Date[] = [];
  divideData = async (criteria: CriteriaInterface<Workout, 'createdAt'>) => {
    this.xdividedRange = await criteria.xaxisDivider([]);
    this.ydividedRange = criteria.yaxisDivider() as Date[];
    let x = 0,
      y = 0;
    const map = new Map<string, Workout[]>();
    while (x < this.xdividedRange.length && y < this.ydividedRange.length) {
      let currentWorkoutDate = this.xdividedRange[x]?.createdAt || new Date();
      let currentDate = this.ydividedRange[y] as Date;
      let key = currentDate.toString();
      if (!map.has(key)) {
        map.set(key, []);
      }
      if (currentWorkoutDate <= currentDate) {
        if (map.has(key)) {
          map.get(key)!.push(this.xdividedRange[x++] as Workout);
        }
      } else {
        y++;
      }
    }
    return Object.fromEntries(map);
  };
}

export class WorkoutAnalytic implements WorkAnalytics {
  public criteria: CriteriaInterface<Workout, 'createdAt'>;
  constructor(
    public dateStart: Date,
    public dateEnd: Date,
    public gap: number,
    public divider: WorkoutDivder
  ) {
    this.criteria = {
      xaxisDivider: this.xaxisDivider,
      yaxisDivider: this.yaxisDivider,
    };
  }
  xaxisDivider = async (ydividedRange: Date[]): Promise<Workout[]> => {
    const werkoutPerformed = await workoutService.getAllEntity({
      where: {
        createdAt: {
          [Op.gte]: this.dateStart,
          [Op.lte]: this.dateEnd,
        },
      },
      order: [['createdAt', 'ASC']],
    });
    return werkoutPerformed;
  };
  yaxisDivider = (): Date[] => {
    let diff =
      (this.dateEnd.getTime() - this.dateStart.getTime()) /
      (1000 * 60 * 60 * 24);
    diff = Math.round(diff);
    const range: Date[] = [];
    for (let i = 0; i < diff; i += this.gap) {
      const currDate = new Date();
      currDate.setDate(currDate.getDate() - i);
      currDate.setHours(0, 0, 0, 0);
      range.unshift(currDate);
    }
    return range;
  };
  getDistributedData = async (): Promise<{
    [key: string]: Workout[];
  }> => {
    return await this.divider.divideData(this.criteria);
  };
}

export const workoutDivder = new WorkoutDivder();
