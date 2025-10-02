import type { FC } from 'react';
import wrappedComponent from '../utils/wrappedComponent';
import { StatsPanel } from '../components/StatsPanel';
import { Dumbbell, Flame, ChartColumn, Trophy } from 'lucide-react';
import { type StatsPaneProps } from '../components/StatsPanel';
import { RecentWorkoutPanel } from '../components/RecentWorkoutPanel';
import { ActivityTracker } from '../components/ActivityTracker';
import { useNavigate } from 'react-router-dom';
const bannetListConfig: StatsPaneProps[] = [
  {
    heading: 'Total Workouts',
    value: '10',
    icon: <Dumbbell />,
    className: '',
  },
  {
    heading: 'Current Streak',
    value: '12 Days',
    icon: <Flame />,
    className: '',
  },
  {
    heading: 'This Month',
    value: '20 Times',
    icon: <ChartColumn />,
    className: '',
  },
  {
    heading: 'Personal Best',
    value: '245 lbs',
    icon: <Trophy />,
    className: '',
  },
];
const namePanel = () => {
  return (
    <div className="flex items-center gap-4 flex-1 m-[3rem]">
      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl">
        💪
      </div>
      <div>
        <h1 className="text-[2rem]">Deepanshu</h1>
        <p className="text-[1rem]">Level 15 - Build Strength</p>
      </div>
    </div>
  );
};

const Hi: FC = () => {
  const navigate = useNavigate();
  const startWorkout = () => {
    navigate('/addWorkout');
  };
  return (
    <div className="flex flex-col items-center justify-center gap-[1rem]">
      <div className="flex w-[80%]">
        {namePanel()}
        <div className="flex-1 flex justify-end m-[4rem]">
          <button
            className="text-[1.5rem] bg-white/10 backdrop-blur-lg rounded-xl px-[1.2rem] border border-white/20 p-[0.6rem]"
            onClick={startWorkout}
          >
            Start Workout
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-[2rem] w-[74%] mb-[2rem]">
        {bannerList()}
        <ActivityTracker type={'TableBased'} />
        <RecentWorkoutPanel />
      </div>
    </div>
  );
};
const bannerList = () => {
  return bannetListConfig.map((el, id) => {
    return <Banners key={id} {...el} />;
  });
};
const Banners: FC<StatsPaneProps> = ({ heading, value, icon, className }) => {
  return (
    <StatsPanel
      heading={heading}
      value={value}
      icon={icon}
      className={className}
    />
  );
};

export default wrappedComponent(Hi, { light: false, screen: true });
