import { TrendingUp } from 'lucide-react';
import { ConsistencyChart } from '../charts/consistency';
import wrappedComponent from '../utils/wrappedComponent';
import type { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  ActivityTracker,
  ActivityTrackerHeader,
} from '../components/ActivityTracker';
import { RecentWorkoutPanel } from '../components/RecentWorkoutPanel';
import { useGetWorkoutStatsQuery } from '../store';
import { Loader } from '../components/Loader';
import { useResizeContext } from '../hooks/useResizeContext';

export const UserStatsMain = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-10">
      <div className="w-[40%] flex flex-col justify-center backdrop-blur-2xl bg-white/5 shadow-2xl rounded-3xl border border-white/10 chart-media overflow-hidden">
        <div className="text-xl text-center py-5 flex gap-3 justify-center items-center font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-300 border-b border-white/5">
          <TrendingUp className="text-fuchsia-400" height={32} width={32} />
          <p>Workout Frequency</p>
        </div>
        <ConsistencyChart />
      </div>
      {/* <div className="flex-1 w-[40%] flex flex-col items-center justify-center border-2 rounded-lg">
        <div className="w4-[40%]">Hi</div>
        <ConsistencyChart />
      </div> */}
    </div>
  );
};

export const UserStatsPage: FC = () => {
  const { data, isLoading } = useGetWorkoutStatsQuery();
  const { width } = useResizeContext();
  const analyticsData = data?.data['getStats'][0];
  if (isLoading) return <Loader />;
  return (
    <div className="w-full flex flex-col items-center py-[2rem]">
      <div className="flex flex-col gap-[2rem] w-[66%] home-resize backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-6 sm:p-10 mt-6 mb-10">
        <div className={`flex ${width > 700 ? 'justify-between items-center px-4' : 'flex-col gap-6 items-center'} w-full border-b border-white/5 pb-8`}>
          <h1 className={`${width > 700 ? 'text-start' : 'text-center'} text-4xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-300`}>
            Workout Statistics
          </h1>
          <button
            className={`text-xl rounded-full px-8 py-4 font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] border border-white/20 hover:-translate-y-1 transition-all duration-300 ${width <= 700 ? 'w-full' : ''}`}
          >
            🔥 Current Streak: {analyticsData?.current_streak || '0'} Days
          </button>
        </div>
        <ActivityTrackerHeader />
        <ErrorBoundary
          fallback={<ActivityTracker type={'TableBased'} error={true} />}
        >
          <ActivityTracker type={'TableBased'} />
        </ErrorBoundary>
        <br />
        <RecentWorkoutPanel />
      </div>
    </div>
  );
};

export default wrappedComponent(UserStatsPage, { light: false, screen: true });
