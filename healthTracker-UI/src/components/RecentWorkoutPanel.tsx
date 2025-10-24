import { useState, type Dispatch, type FC, type SetStateAction } from 'react';
import wrappedComponent from '../utils/wrappedComponent';
import { Calendar, Dumbbell } from 'lucide-react';
import { useGetAllWorkOutQuery, type RootState } from '../store';
import type { ExerciseSet } from '../interface/Workout_Interfaces';
import { useNavigate } from 'react-router-dom';

const RecentWorkoutPanelMain: FC = () => {
  const [currentDay, setCurrentDay] = useState<number | undefined>();
  return (
    <div className="h-[50rem] flex flex-col p-[1rem]">
      <div className="grid grid-cols-[0.1fr_1fr] place-items-center w-fit py-5 text-3xl">
        <Calendar
          className="inline mx-2 text-purple-400"
          height={40}
          width={30}
        />
        <h1 className="font-bold">Workout Activity</h1>
      </div>
      <div className="flex flex-col gap-[2rem] flex-1 overflow-hidden">
        {/* <Dumbbell size={48 * 1.5} /> */}
        <LastWorkOutPanel
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
}
const LastWorkOutPanel: FC<LastWorkOutPanelProps> = ({
  setCurrentDay,
  currentDay,
}) => {
  const buttonOnClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    key: number
  ) => {
    e.preventDefault();
    setCurrentDay(key);
  };
  return (
    <div>
      <div className="flex h-full gap-[2%] justify-evenly overflow-x-auto">
        {weekdays.map((w, id) => (
          <button
            className={`border-2 border-neutral-600 w-[8rem] h-[3rem] m-1 px-2 py-1 rounded-lg shadow-lg scale-105 ${
              currentDay == id
                ? 'bg-purple-700 font-semibold border-purple-600'
                : ''
            }`}
            key={id}
            onClick={(e) => buttonOnClick(e, id)}
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
  const { isLoading, data, isError } = useGetAllWorkOutQuery({
    day: currentDay,
  });
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
      <div className="p-[1.5rem] flex flex-col gap-[2rem]">
        <div className="text-2xl grid grid-cols-[0.1fr_1fr] place-items-center w-fit">
          <Calendar className="inline mx-2 text-purple-400 " />
          <p>{`${day >= 0 ? weekdays[day] : 'Last'} Workout`}</p>
        </div>
        <div className="mx-3 flex">
          <div className="flex-1">
            <p className="text-lg bg-purple-700 rounded-full font-semibold p-3 text-neutral-200 w-fit">
              {name || 'Back Day'}
            </p>
          </div>
          {workout && workout?.exerciseSets.length >= 0 && (
            <button
              className="text-lg bg-neutral-800 rounded-full font-semibold p-4 w-fit text-neutral-200 ml-1"
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
  return (
    <div className="p-[1.5rem] flex flex-col text-xl m-[2rem] rounded-lg border-2 border-neutral-700 text-neutral-300 bg-neutral-800 shadow-lg">
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <p className="flex-1 flex-start">{exerciseSet.Exercise?.name}</p>
          <p className="flex-1 text-end ml-3 text-red-400 bg-red font-bold">
            Strength
          </p>
        </div>
        <div className="flex gap-4">
          <p>{`Sets: ${exerciseSet.sets.length}`}</p>
          <p>{`Reps: ${minReps}-${maxReps}`}</p>
          <p>{`Weight: ${minWeight}-${maxWeight}`}</p>
        </div>
      </div>
    </div>
  );
};
