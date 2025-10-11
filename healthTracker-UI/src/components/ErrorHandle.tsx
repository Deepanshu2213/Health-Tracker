import classNames from 'classnames';
import type { FC } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
interface errorHandlerProps {
  screen?: boolean;
}
export const ErrorHandler: FC<errorHandlerProps> = ({ screen }) => {
  const { resetBoundary } = useErrorBoundary();
  const cls = classNames(
    'flex flex-col justify-center items-center',
    screen ? 'min-h-screen min-w-screen h-full' : 'h-full w-full',
    'bg-neutral-900 text-white'
  );
  return (
    <div className={cls}>
      <p className="m-4 text-3xl">Something went wrong</p>
      <button
        onClick={resetBoundary}
        className="border border-2 bg-grey-600 px-3 rounded-lg"
      >
        Retry
      </button>
    </div>
  );
};
