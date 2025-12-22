import classNames from 'classnames';
import { Timer as TimerIcon, TimerOff, TimerReset } from 'lucide-react';
import { useEffect, useState, type FC } from 'react';
interface TimerProps {
  className?: string;
  inputCls?: string;
  value?: number;
  onChange?: (value: number) => void;
}
export const Timer: FC<TimerProps> = ({
  className,
  inputCls,
  onChange,
  value,
}) => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState<number>(value || 0);
  const [running, setRunning] = useState<boolean>(false);
  const cls = classNames(
    'justify-center items-center cursor border b-2 border-neutral-500 rounded-lg w-full max-w-xs flex',
    className
  );
  useEffect(() => {
    let interval: number | null = null;
    if (running) {
      if (!startTime) {
        setStartTime(Date.now() - elapsed);
      } else {
        interval = setInterval(() => {
          setElapsed(Date.now() - startTime);
        }, 1000);
      }
    }
    return () => {
      interval && clearInterval(interval);
    };
  }, [running, elapsed, startTime]);
  useEffect(() => {
    onChange?.(elapsed);
  }, [elapsed]);
  const startTimer = () => {
    setRunning(true);
  };
  const stopTimer = () => {
    setStartTime(null);
    setRunning(false);
  };
  const resetTimer = () => {
    setElapsed(0);
    setStartTime(null);
  };
  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const s = String(totalSec % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };
  return (
    <div className={cls}>
      <input
        type="text"
        disabled
        value={formatTime(elapsed)}
        className="w-full rounded-lg p-2 flex-1"
      />
      {elapsed > 0 && !running ? (
        <TimerReset className="flex-[0.4]" onClick={resetTimer} />
      ) : (
        ''
      )}
      {running ? (
        <TimerOff className="flex-[0.4] pr-2" onClick={stopTimer} />
      ) : (
        <TimerIcon className="flex-[0.4] pr-1" onClick={startTimer} />
      )}
    </div>
  );
};
