import type { FC, ReactNode } from 'react';
import wrappedComponent from '../utils/wrappedComponent';
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
  const cls = classNames(className, 'flex items-center p-[1rem] text-xl m-3');
  return (
    <div className={cls} {...rest}>
      <div className="flex-1 flex flex-col gap-2">
        <h1>{heading}</h1>
        <p>{value}</p>
      </div>
      <div className="flex-1 flex justify-end text-purple-400">{icon}</div>
    </div>
  );
};

export const StatsPanel = wrappedComponent(StatsPanelMain, {
  light: false,
  overlay: true,
  className: 'w-full',
});
