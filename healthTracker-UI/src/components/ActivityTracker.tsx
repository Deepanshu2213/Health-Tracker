import { useEffect, useRef, useState, type FC, type ReactElement } from 'react';
import wrappedComponent from '../utils/wrappedComponent';
import { useGetWorkoutQuery, type loginDispatch } from '../store';
import type { Workout } from '../interface/Workout_Interfaces';
import { ErrorHandler } from './ErrorHandle';
import { Loader } from './Loader';
import { useDispatch } from 'react-redux';
import { updateWorkout } from '../store/slices/CurretWorkout';
interface size {
  height: number | undefined;
  width: number | undefined;
}
interface dateMap {
  [time: string]: Workout[];
}

type activityType = 'TableBased' | 'ActivityBased';

interface ActivityTrackerProps {
  type: activityType;
  error?: boolean;
}
const ActivityTrackerMain: FC<ActivityTrackerProps> = ({ type, error }) => {
  const [size, setSize] = useState<size>({
    height: undefined,
    width: undefined,
  });

  const { height, width } = size;
  const trackContainer = useRef<HTMLDivElement>(null);
  const setSizeOnChange = () => {
    if (type === 'TableBased') return;
    const width = Math.floor(
      trackContainer?.current?.getBoundingClientRect().width || 0
    );
    const height = Math.floor(
      trackContainer?.current?.getBoundingClientRect().height || 0
    );
    setSize({ height: height, width: width });
  };
  useEffect(() => {
    setSizeOnChange();
    const changeHandler = () => {
      setSizeOnChange();
    };
    window.addEventListener('resize', changeHandler);
    return () => {
      window.removeEventListener('resize', changeHandler);
    };
  }, []);
  interface GenerateTableProps {
    rows: number;
    columns: number;
    dateMapper: dateMap;
  }
  const GenerateTable: FC<GenerateTableProps> = ({
    rows,
    columns,
    dateMapper,
  }) => {
    const currDate = new Date();
    currDate.setDate(1 + currDate.getDate() - rows * columns);
    currDate.setHours(0, 0, 0, 0);
    return (
      <table className="table-fixed w-full border-separate border-spacing-1">
        <tbody>
          {Array.from({ length: rows }).map((_, id) => {
            const newDate = new Date(currDate);
            const jsx = (
              <tr key={id} className="h-[1vh]">
                <GenerateRows
                  row={rows}
                  columns={columns}
                  dateMapper={dateMapper}
                  date={newDate}
                  key={id + 'row'}
                />
              </tr>
            );
            currDate.setDate(1 + currDate.getDate());
            return jsx;
          })}
        </tbody>
      </table>
    );
  };
  interface GenerateRowsProps {
    columns: number;
    date: Date;
    row: number;
    dateMapper: dateMap;
  }
  const GenerateRows: FC<GenerateRowsProps> = ({
    columns,
    date,
    row,
    dateMapper,
  }) => {
    const dispatch = useDispatch<loginDispatch>();
    return Array.from({ length: columns }).map((_, id) => {
      let key: string = date.toISOString();
      key = key.split('T')[0];
      const workoutsPerformed = dateMapper[key];
      let dateJson = date.toJSON();
      const jsx = (
        <td
          key={id}
          className={`border-1 border-neutral-800 ${
            workoutsPerformed?.length > 0 ? 'bg-green-600' : 'bg-neutral-800'
          } rounded-sm w-[2vh] relative tooltip_cmp`}
          onClick={() => {
            dispatch(updateWorkout(dateJson));
          }}
        >
          <span className="tooltip text-wrap">{`On ${date.toDateString()}  ${
            workoutsPerformed?.length
              ? `performed ${workoutsPerformed?.length} workouts`
              : 'not performed'
          }`}</span>
        </td>
      );
      date.setDate(date.getDate() + row);
      return jsx;
    });
  };
  const GenarateRowCol = (rows: number, columns: number) => {
    debugger;
    const cellHeight = height ? height / columns - 10 : 0;
    const cellWidth = width ? width / rows - 10 : 0;
    const elements: ReactElement[] = [];
    for (let i = 0; i < rows; i++) {
      elements.push(GenarateCol(columns, cellHeight, cellWidth));
    }
    return elements;
  };

  const GenarateCol = (
    columns: number,
    cellHeight: number,
    cellWidth: number
  ): ReactElement => {
    const ele = Array.from({ length: columns }).map(() => {
      return (
        <div
          className="backdrop-blur-lg rounded-xl border border-white/20"
          style={{ height: cellHeight, width: cellWidth }}
        ></div>
      );
    });
    return <div className="flex flex-col gap-2">{ele}</div>;
  };
  const rows = 7,
    columns = 50;
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(1 + startDate.getDate() - rows * columns);
  const { data, isLoading, isError } = useGetWorkoutQuery({
    startDate: startDate.toDateString(),
    endDate: endDate.toDateString(),
  });
  if (isLoading) {
    return <Loader screen={false} />;
  }
  let records: dateMap = {};
  data?.data['getWorkout'].forEach((workout) => {
    if (records[workout.createdAt || '']) {
      records[workout.createdAt || ''].push(workout);
    } else {
      records[workout.createdAt || ''] = [workout];
    }
  });
  if (isError || error) {
    return (
      <div ref={trackContainer} className="h-[22vh] p-2">
        <div className="flex gap-2 w-full h-full overflow-x-auto overflow-y-hidden text-center justify-center items-center">
          <ErrorHandler />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full h-full">
      <div ref={trackContainer} className="h-[22vh] p-2 w-full">
        <div className="flex gap-2 h-full overflow-y-auto">
          {type == 'TableBased' ? (
            <GenerateTable rows={rows} dateMapper={records} columns={columns} />
          ) : (
            GenarateRowCol(6, 5)
          )}
        </div>
      </div>
    </div>
  );
};
export const ActivityTrackerHeader: FC = () => {
  const intensityLevels = [
    'bg-neutral-800', // Empty/0 (Dark gray for "no activity")
    'bg-green-900', // Low
    'bg-green-700', // Medium
    'bg-green-500', // High
  ];
  return (
    <div className="flex w-[12vh] p-1 flex gap-3 text-lg">
      <p>Less</p>
      <table className="table-fixed w-full border-separate border-spacing-1">
        <tbody>
          <tr className="h-[2.2vh]">
            {Array.from({ length: 4 }).map((_, idx) => (
              <td
                key={idx}
                className={`rounded-sm w-[2vh] border-1 border-neutral-800 ${intensityLevels[idx]}`}
              ></td>
            ))}
          </tr>
        </tbody>
      </table>
      <p>More</p>
    </div>
  );
};

export const ActivityTracker = wrappedComponent(ActivityTrackerMain, {
  overlay: true,
});
