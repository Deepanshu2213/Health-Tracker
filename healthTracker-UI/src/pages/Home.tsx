import type { FC } from 'react';
import wrappedComponent from '../utils/wrappedComponent';
import { StatsPanel } from '../components/StatsPanel';
import { Dumbbell, Flame, ChartColumn, Trophy } from 'lucide-react';
import { type StatsPaneProps } from '../components/StatsPanel';
import { useNavigate } from 'react-router-dom';
import { useGetWorkoutStatsQuery, type RootState } from '../store';
import { useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { useResizeContext } from '../hooks/useResizeContext';
import { ConsistencyChart } from '../charts/consistency';

const NamePanel: FC = () => {
  const user = useSelector((state: RootState) => {
    return state.login.data?.data;
  });
  const loggedInUser = user?.[0];
  return (
    <div className="flex items-center gap-6 flex-1">
      <div className="w-20 h-20 shrink-0 bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/20 rounded-full flex items-center justify-center text-3xl">
        💪
      </div>
      <div>
        <h1 className="text-[2.5rem] leading-tight font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-300">{`${
          loggedInUser ? loggedInUser.firstName : 'Athlete'
        }`}</h1>
        <p className="text-xl text-neutral-300">Level 15 - Build Strength</p>
      </div>
    </div>
  );
};
const Heading: FC = () => {
  const { width } = useResizeContext();
  const navigate = useNavigate();
  const startWorkout = () => {
    navigate('/addWorkout');
  };
  return (
    <div
      className={`flex ${width < 700 ? 'flex-col gap-6' : 'items-center justify-between'} w-[74%] home-resize backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-8 mb-[1rem] mt-[3rem]`}
    >
      <NamePanel />
      <div
        className={`flex shrink-0 ${width < 700 ? 'w-full' : ''}`}
      >
        <button
          className={`text-xl rounded-full px-8 py-4 font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] border border-white/20 hover:-translate-y-1 transition-all duration-300 ${
            width < 700 ? 'w-full' : ''
          }`}
          onClick={startWorkout}
        >
          Start Workout
        </button>
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
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col items-center justify-center gap-[1rem]">
      <Heading />
      <div className="flex flex-col gap-[2rem] w-[74%] mb-[2rem] home-resize">
        {bannerList(bannetListConfig)}
        <div className="flex flex-col items-center backdrop-blur-lg bg-white/5 shadow-2xl rounded-xl border-2 border-white/10 text-3xl">
          <h1 className="text-center mx-2 my-5 p-2 font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-300">Workout Statistics</h1>
          <div className="consistency-chart">
            <ConsistencyChart />
          </div>
        </div>
        {/* <ErrorBoundary
          fallback={<ActivityTracker type={'TableBased'} error={true} />}
        >
          <ActivityTracker type={'TableBased'} />
        </ErrorBoundary>
        <RecentWorkoutPanel /> */}
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
