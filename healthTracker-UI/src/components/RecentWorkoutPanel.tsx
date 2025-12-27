import { useState, type Dispatch, type FC, type SetStateAction } from 'react';
import wrappedComponent from '../utils/wrappedComponent';
import { Calendar } from 'lucide-react';
import {
  useGetAllWorkOutQuery,
  type loginDispatch,
  type RootState,
} from '../store';
import type { ExerciseSet } from '../interface/Workout_Interfaces';
import { useNavigate } from 'react-router-dom';
import { useResizeContext } from '../hooks/useResizeContext';
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkout } from '../store/slices/CurretWorkout';

const RecentWorkoutPanelMain: FC = () => {
  const [currentDay, setCurrentDay] = useState<number | undefined>();
  const { width } = useResizeContext();
  return (
    <div className="h-[50rem] flex flex-col p-[1rem]">
      <div className="grid grid-cols-[0.1fr_1fr] place-items-center w-fit py-5 text-3xl">
        <Calendar
          className="inline mx-2 text-purple-400"
          height={40}
          width={30}
        />
        <h1 className={`font-bold ${width <= 800 ? 'text-xl' : ''}`}>
          Workout Activity
        </h1>
      </div>
      <div className="flex flex-col gap-[2rem] flex-1 overflow-hidden">
        {/* <Dumbbell size={48 * 1.5} /> */}
        <LastWorkOutPanel
          width={width}
          setCurrentDay={setCurrentDay}
          currentDay={currentDay}
        />
        <ContentPanel currentDay={currentDay} />
      </div>
    </div>
  );
};

export const RecentWorkoutPanel = wrappedComponent(RecentWorkoutPanelMain, {
  overlay: true,
  className: 'w-full',
});

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
interface LastWorkOutPanelProps {
  setCurrentDay: Dispatch<SetStateAction<number | undefined>>;
  currentDay: number | undefined;
  width: number;
}
const LastWorkOutPanel: FC<LastWorkOutPanelProps> = ({
  setCurrentDay,
  currentDay,
  width,
}) => {
  const dispatch = useDispatch<loginDispatch>();
  const buttonOnClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    key: number
  ) => {
    e.preventDefault();
    setCurrentDay(key);
    dispatch(updateWorkout(''));
  };
  return (
    <div>
      <div className="flex h-full gap-[2%] justify-evenly overflow-x-auto">
        {weekdays.map((w, id) => (
          <button
            className={`border-2 border-neutral-600 w-[8rem] h-[3rem] m-1 px-2 py-1 rounded-lg shadow-lg ${
              currentDay == id
                ? 'bg-purple-700 font-semibold border-purple-600'
                : ''
            } ${width <= 800 ? 'text-base' : 'scale-105'}`}
            key={id}
            onClick={(e) => {
              buttonOnClick(e, id);
            }}
          >
            {w}
          </button>
        ))}
      </div>
    </div>
  );
};

interface ContentPanelProps {
  currentDay: number | undefined;
}

const ContentPanel: FC<ContentPanelProps> = ({ currentDay }) => {
  const currentDateSelection = useSelector(
    (state: RootState) => state.currentWorkout
  );
  const { data } = useGetAllWorkOutQuery({
    day: currentDay,
    customDay: currentDateSelection,
  });
  debugger;
  const { width } = useResizeContext();
  const navigateTo = useNavigate();
  const workout = data?.data[0];
  const name = workout?.name;
  let day = -1;
  if (!currentDay && workout && workout.createdAt) {
    const firstRecordDate = new Date(workout.createdAt);
    day = firstRecordDate.getDay();
  } else if (workout || currentDay || currentDay === 0) {
    day = currentDay || 0;
  }
  const routeCreateWorkout = () => {
    navigateTo('/addWorkout', {
      state: {
        workout: workout,
      },
    });
  };
  return (
    <div className="flex-1 h-full w-full bg-neutral-900">
      <div
        className={`${
          width > 900 ? 'p-[1.5rem] text-2xl ' : 'text-lg'
        } flex flex-col gap-[2rem]`}
      >
        <div className="grid grid-cols-[0.1fr_1fr] place-items-center w-fit">
          <Calendar className="inline mx-2 text-purple-400 " />
          <p>{`${day >= 0 ? weekdays[day] : 'Last'} ${
            currentDateSelection
              ? new Date(currentDateSelection).toLocaleDateString()
              : 'selected'
          } Workout`}</p>
        </div>
        <div className="mx-3 flex">
          <div className="flex-1">
            <p className="bg-purple-700 rounded-full font-semibold p-3 text-neutral-200 w-fit text-center @max-[400px]:text-sm">
              {name || 'Back Day'}
            </p>
          </div>
          {workout && workout?.exerciseSets.length >= 0 && (
            <button
              className="bg-neutral-800 rounded-full font-semibold p-4 w-fit text-neutral-200 ml-1"
              type="submit"
              onClick={routeCreateWorkout}
            >
              Copy Workout
            </button>
          )}
        </div>
      </div>
      <div className="h-[65%] overflow-y-auto">
        {workout?.exerciseSets.map((exerciseSet) => (
          <ContentPanelSetsRender
            exerciseSet={exerciseSet}
            key={exerciseSet.id}
          />
        ))}
      </div>
    </div>
  );
};

interface ContentPanelSetsRenderProps {
  exerciseSet: ExerciseSet;
}
const ContentPanelSetsRender: FC<ContentPanelSetsRenderProps> = ({
  exerciseSet,
}) => {
  let minReps = Infinity,
    maxReps = -Infinity,
    minWeight = Infinity,
    maxWeight = -Infinity;
  exerciseSet.sets.forEach((set) => {
    debugger;
    (maxReps = Math.max(maxReps, set.repsCount)),
      (minReps = Math.min(minReps, set.repsCount));
    minWeight = Math.min(minWeight, set.weight);
    maxWeight = Math.max(maxWeight, set.weight);
  });
  const { width } = useResizeContext();
  return (
    <div
      className={`${
        width > 700
          ? 'p-[1.5rem] m-[2rem] text-xl'
          : 'p-[1rem] my-[1.5rem] text-sm'
      } flex flex-col rounded-lg border-2 border-neutral-700 text-neutral-300 bg-neutral-800 shadow-lg`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <p className="flex-1 flex-start">{exerciseSet.Exercise?.name}</p>
          <p
            className={`flex-1 text-end ml-3 text-red-400 bg-red font-bold ${
              width > 700 ? '' : 'pr-[1rem]'
            }`}
          >
            Strength
          </p>
        </div>
        <div className={`flex  gap-4`}>
          <p>{`Sets: ${exerciseSet.sets.length}`}</p>
          <p>{`Reps: ${minReps}-${maxReps}`}</p>
          <p>{`Weight: ${minWeight}-${maxWeight}`}</p>
        </div>
      </div>
    </div>
  );
};
