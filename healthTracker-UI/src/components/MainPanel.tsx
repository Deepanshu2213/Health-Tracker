import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { MenuBar } from './MenuBar';

export const MainPanel: FC = () => {
  return (
    <main className="min-h-screen min-w-screen relative">
      <Outlet />
      <MenuBar />
    </main>
  );
};
