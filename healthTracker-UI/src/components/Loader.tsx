import classNames from 'classnames';
import type { FC } from 'react';

interface LoaderProps {
  screen?: boolean;
}

export const Loader: FC<LoaderProps> = ({ screen }) => {
  const cls = classNames(
    screen == false ? 'h-full w-full' : 'h-screen w-screen',
    'flex flex-col justify-center items-center bg-neutral-900 gap-[5%]'
  );

  return (
    <div className={cls}>
      <div
        className="
          w-32 h-32
          border-4 border-white
          border-t-blue-500
          rounded-full
          animate-spin
        "
      ></div>
      <div
        className="
          text-white
          translate-x-[10%]
          text-2xl
          font-semibold
          tracking-wide
          animate-pulse
          text-center
        "
      >
        Loading...
      </div>
    </div>
  );
};
