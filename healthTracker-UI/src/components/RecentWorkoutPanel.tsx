import type { FC } from 'react';
import wrappedComponent from '../utils/wrappedComponent';
import { Dumbbell } from 'lucide-react';

const RecentWorkoutPanelMain: FC = () => {
  return (
    <div className="h-[50vh] flex flex-col p-[1rem]">
      <h1 className="text-xl m-3">Workout Activity</h1>
      <div className="flex flex-col gap-[2rem] flex-1 justify-center items-center opacity-[0.5]">
        <Dumbbell size={48 * 1.5} />
        <p className="text-lg">No workouts yet. Start your first workout!</p>
      </div>
    </div>
  );
};

export const RecentWorkoutPanel = wrappedComponent(RecentWorkoutPanelMain, {
  overlay: true,
  className: 'w-full',
});
