import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { LoginManagerProvider } from './context/LoginManagerContext.tsx';
import { store } from './store';
import { ResizeContextProvider } from './context/ResizeContexProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <LoginManagerProvider>
      <ResizeContextProvider>
        <App />
      </ResizeContextProvider>
    </LoginManagerProvider>
  </Provider>
);
