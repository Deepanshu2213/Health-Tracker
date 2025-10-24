import { TrendingUp } from 'lucide-react';
import { ConsistencyChart } from '../charts/consistency';
import wrappedComponent from '../utils/wrappedComponent';

const UserStatsMain = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <div className="w-[40%] flex flex-col justify-center border-2 shadow-xl border-neutral-700 rounded-lg">
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

export default wrappedComponent(UserStatsMain, { light: false, screen: true });
