import type { FC } from 'react';
import {
  ChartArea,
  ChartColumnIncreasing,
  Dumbbell,
  UserRoundPen,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MenuBar: FC = () => {
  const navigatTo = useNavigate();
  const size = 24 * 1.5;
  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 bg-neutral-700/30 backdrop-blur-lg text-white px-6 py-3 rounded-full shadow-lg">
      <div className="flex gap-6">
        <button
          onClick={() => {
            navigatTo('/');
          }}
        >
          <ChartColumnIncreasing size={size} />
        </button>
        <button
          onClick={() => {
            navigatTo('/exercise');
          }}
        >
          <Dumbbell size={size} />
        </button>
        <button
          onClick={() => {
            navigatTo('/addWorkout');
          }}
        >
          <UserRoundPen size={size} />
        </button>
        <button
          onClick={() => {
            navigatTo('/stats');
          }}
        >
          <ChartArea size={size} />
        </button>
      </div>
    </div>
  );
};
