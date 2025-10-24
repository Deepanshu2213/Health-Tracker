import type { FC } from 'react';
import wrappedComponent from '../utils/wrappedComponent';
import { StatsPanel } from '../components/StatsPanel';
import { Dumbbell, Flame, ChartColumn, Trophy } from 'lucide-react';
import { type StatsPaneProps } from '../components/StatsPanel';
import { RecentWorkoutPanel } from '../components/RecentWorkoutPanel';
import { ActivityTracker } from '../components/ActivityTracker';
import { useNavigate } from 'react-router-dom';
import { useGetWorkoutStatsQuery, type RootState } from '../store';
import { useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { Loader } from '../components/Loader';

const NamePanel: FC = () => {
  const user = useSelector((state: RootState) => {
    return state.login.data?.data;
  });
  const loggedInUser = user?.[0];
  return (
    <div className="flex items-center gap-4 flex-1 m-[3rem] heading">
      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl">
        💪
      </div>
      <div>
        <h1 className="text-[2rem]">{`${
          loggedInUser ? loggedInUser.firstName : 'Na'
        }`}</h1>
        <p className="text-[1rem]">Level 15 - Build Strength</p>
      </div>
    </div>
  );
};

const Hi: FC = () => {
  const { data, isLoading } = useGetWorkoutStatsQuery();
  const analyticsData = data?.data['getStats'][0];
  const bannetListConfig: StatsPaneProps[] = [
    {
      heading: 'Total Workouts (Year)',
      value: analyticsData?.total_workouts || 10,
      icon: <Dumbbell />,
      className: '',
    },
    {
      heading: 'Current Streak (Year)',
      value: `${analyticsData?.current_streak || 0} days`,
      icon: <Flame />,
      className: '',
    },
    {
      heading: 'This Month (Year)',
      value: `${analyticsData?.this_month || 0} Times`,
      icon: <ChartColumn />,
      className: '',
    },
    {
      heading: 'Max Streak (Year)',
      value: `${analyticsData?.max_streaks || 0} Times`,
      icon: <Trophy />,
      className: '',
    },
  ];
  const navigate = useNavigate();
  const startWorkout = () => {
    navigate('/addWorkout');
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col items-center justify-center gap-[1rem]">
      <div className="flex w-[80%] home-resize">
        <NamePanel />
        <div className="flex-1 flex justify-end items-center pr-[3rem]">
          <button
            className="text-2xl rounded-xl px-[1.2rem] shadow-lg border-3 border-neutral-700 p-[0.6rem] h-fit"
            onClick={startWorkout}
          >
            Start Workout
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-[2rem] w-[74%] mb-[2rem] home-resize">
        {bannerList(bannetListConfig)}
        <ErrorBoundary
          fallback={<ActivityTracker type={'TableBased'} error={true} />}
        >
          <ActivityTracker type={'TableBased'} />
        </ErrorBoundary>
        <RecentWorkoutPanel />
      </div>
    </div>
  );
};
const bannerList = (bannetListConfig: StatsPaneProps[]) => {
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
