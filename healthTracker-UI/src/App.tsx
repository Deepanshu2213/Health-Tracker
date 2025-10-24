import { lazy, Suspense, type FC } from 'react';
const LazyLogin = lazy(() => import('./pages/Login'));
import { useSelector } from 'react-redux';
import type { RootState } from '../src/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainPanel } from './components/MainPanel';
import './App.css';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandler } from './components/ErrorHandle';
import { Loader } from './components/Loader';
type pages = 'HomePage' | 'AddWorkout' | 'Exercise' | 'UserStats';
type pagesMapType = {
  [K in pages]: FC;
};
const PageMap: pagesMapType = {
  AddWorkout: lazy(() =>
    import('./pages/AddWorkout').then((module) => ({
      default: module.AddWorkout,
    }))
  ),
  HomePage: lazy(() => import('./pages/Home')),
  Exercise: lazy(() =>
    import('./pages/Exercise').then((module) => ({
      default: module.Exercise,
    }))
  ),
  UserStats: lazy(() => import('./pages/UserStats')),
};
const HomePage = PageMap['HomePage'];
const AddWorkout = PageMap['AddWorkout'];
const Exercise = PageMap['Exercise'];
const UserStats = PageMap['UserStats'];

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPanel />,
    children: [
      {
        index: true,
        element: (
          <ErrorBoundary fallback={<ErrorHandler screen={true} />}>
            <Suspense fallback={<Loader screen={true} />}>
              <HomePage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: 'addWorkout',
        element: (
          <ErrorBoundary fallback={<ErrorHandler screen={true} />}>
            <Suspense fallback={<Loader screen={true} />}>
              <AddWorkout />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: 'exercise',
        element: (
          <ErrorBoundary fallback={<ErrorHandler screen={true} />}>
            <Suspense fallback={<Loader screen={true} />}>
              <Exercise />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: 'stats',
        element: (
          <ErrorBoundary fallback={<ErrorHandler screen={true} />}>
            <Suspense fallback={<Loader screen={true} />}>
              <UserStats />
            </Suspense>
          </ErrorBoundary>
        ),
      },
    ],
  },
]);
function App() {
  const { loading, error, data } = useSelector((state: RootState) => {
    return state.login;
  });
  if (loading) {
    return <Loader screen={true} />;
  }
  if (data) {
    return <RouterProvider router={router} />;
  }
  return (
    <div>
      <Suspense fallback={<Loader screen={true} />}>
        <LazyLogin />
      </Suspense>
    </div>
  );
}

export default App;
