import type { ComponentType, FC } from 'react';
import Panel from '../components/Panel';

interface WrapperOptions {
  className?: string;
  light?: boolean;
  id?: string;
  overlay?: boolean;
  screen?: boolean;
}

const wrappedComponent = <P extends object>(
  Component: ComponentType<P>,
  options?: WrapperOptions
): FC<P> => {
  const { id, className, light, overlay, screen } = options || {};
  const WrapperComp: FC<P> = (props) => (
    <Panel
      id={id}
      className={className}
      light={light}
      overlay={overlay}
      screen={screen}
    >
      <Component {...props} />
    </Panel>
  );
  return WrapperComp;
};

export default wrappedComponent;
