import { lazy, Suspense } from 'react';
const LazyLogin = lazy(() => import('./pages/Login'));
import { useSelector } from 'react-redux';
import type { RootState } from '../src/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainPanel } from './components/MainPanel';
import HomePage from './pages/Home';
import './App.css';
import { AddWorkout } from './pages/AddWorkout';
import { Exercise } from './pages/Exercise';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPanel />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'addWorkout',
        element: <AddWorkout />,
      },
      {
        path: 'exercise',
        element: <Exercise />,
      },
    ],
  },
]);
function App() {
  const { loading, error, data } = useSelector((state: RootState) => {
    return state.login;
  });
  if (loading) {
    return <>Work in progress</>;
  }
  if (data) {
    return <RouterProvider router={router} />;
  }
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyLogin />
      </Suspense>
    </div>
  );
}

export default App;
