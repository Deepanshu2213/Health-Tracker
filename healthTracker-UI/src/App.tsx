import { lazy, Suspense, type FC } from 'react';
const LazyLogin = lazy(() => import('./pages/Login'));
import { useSelector } from 'react-redux';
import type { RootState } from '../src/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainPanel } from './components/MainPanel';
import './App.css';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandler } from './components/ErrorHandle';
type pages = 'HomePage' | 'AddWorkout' | 'Exercise';
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
};
const HomePage = PageMap['HomePage'];
const AddWorkout = PageMap['AddWorkout'];
const Exercise = PageMap['Exercise'];

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPanel />,
    children: [
      {
        index: true,
        element: (
          <ErrorBoundary fallback={<ErrorHandler screen={true} />}>
            <Suspense fallback={<div>Loading Page ...</div>}>
              <HomePage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: 'addWorkout',
        element: (
          <ErrorBoundary fallback={<ErrorHandler screen={true} />}>
            <Suspense fallback={<div>Loading Page ...</div>}>
              <AddWorkout />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: 'exercise',
        element: (
          <ErrorBoundary fallback={<ErrorHandler screen={true} />}>
            <Suspense fallback={<div>Loading Page ...</div>}>
              <Exercise />
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
