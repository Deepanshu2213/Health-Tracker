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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-neutral-950/40 backdrop-blur-2xl text-neutral-400 px-8 py-4 rounded-full border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 transition-all">
      <div className="flex gap-8 items-center">
        <button
          className="hover:text-violet-400 hover:scale-110 transition-all duration-300"
          onClick={() => {
            navigatTo('/');
          }}
        >
          <ChartColumnIncreasing size={size} />
        </button>
        <button
          className="hover:text-fuchsia-400 hover:scale-110 transition-all duration-300"
          onClick={() => {
            navigatTo('/exercise');
          }}
        >
          <Dumbbell size={size} />
        </button>
        <button
          className="hover:text-violet-400 hover:scale-110 transition-all duration-300"
          onClick={() => {
            navigatTo('/addWorkout');
          }}
        >
          <UserRoundPen size={size} />
        </button>
        <button
          className="hover:text-fuchsia-400 hover:scale-110 transition-all duration-300"
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
