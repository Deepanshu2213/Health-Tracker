import type { FC, ReactNode } from 'react';
import classNames from 'classnames';
interface PanelProps {
  children: ReactNode;
  className?: string;
  light?: boolean;
  id?: string;
  overlay?: boolean;
  screen?: boolean;
}

const Panel: FC<PanelProps> = ({
  children,
  className,
  light,
  id,
  overlay,
  screen,
}) => {
  const clss = classNames(
    'max-[400px]:text-sm tracking-wide h-full w-full',
    overlay ? 'backdrop-blur-lg rounded-xl border border-white/20' : '',
    className ? className : '',
    light ? 'bg-gray-900 text-gray-300' : 'bg-neutral-900 text-white',
    screen ? 'min-h-screen min-w-screen' : '',
    'flex flex-col'
  );
  return (
    <section className={clss} id={id}>
      {children}
    </section>
  );
};

export default Panel;
