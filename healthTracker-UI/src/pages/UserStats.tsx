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
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <div className="w-[40%] flex flex-col justify-center border-2 shadow-xl border-neutral-700 rounded-lg chart-media">
        <div className="w4-[40%] text-xl text-center py-5 flex gap-2 justify-center items-center">
          <TrendingUp className="text-purple-500" height={30} width={30} />
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
    <div className="w-full flex flex-col items-center">
      <div className="flex text-3xl w-full justify-center my-4">
        <div
          className={`${
            width > 700
              ? 'flex justify-between items-center w-[66%]'
              : 'flex flex-col items-center w-[90%] gap-2 m-1'
          }`}
        >
          <h1 className={`${width > 700 ? 'text-start' : 'text-center'}`}>
            Workout Statictics
          </h1>
          <button
            className={`text-2xl rounded-xl shadow-lg border-3 border-neutral-700 ${
              width > 700 ? ' p-2 m-2' : 'py-2 w-full'
            }`}
          >{`Current streak: ${analyticsData?.current_streak || '0'}`}</button>
        </div>
      </div>
      <div className="gap-[2rem] w-[66%] home-resize">
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
