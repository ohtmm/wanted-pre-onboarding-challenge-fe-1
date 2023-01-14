import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TodoBoard from './pages/TodoBoard';
import AuthChecker from './components/authChecker/AuthCheck';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      {
        path: '/',
        element: <AuthChecker />,
        children: [
          {
            index: true,
            element: <TodoBoard />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      suspense: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
