import type { FC, ReactNode } from 'react';
import classNames from 'classnames';
export interface StatsPaneProps {
  heading: string;
  value: number | string;
  icon: ReactNode;
  className: string;
  [key: string]: any;
}
export const StatsPanelMain: FC<StatsPaneProps> = ({
  heading,
  value,
  icon,
  className,
  ...rest
}) => {
  const cls = classNames(className, 'flex items-center p-6 text-xl m-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-white/10 shrink-0');
  return (
    <div className={cls} {...rest}>
      <div className="flex-1 flex flex-col gap-2">
        <h1>{heading}</h1>
        <p className="font-semibold text-2xl mt-1 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-300">{value}</p>
      </div>
      <div className="flex-1 flex justify-end text-fuchsia-400 drop-shadow-[0_0_12px_rgba(217,70,239,0.5)] transform transition-transform group-hover:scale-110">{icon}</div>
    </div>
  );
};

export const StatsPanel = StatsPanelMain;
