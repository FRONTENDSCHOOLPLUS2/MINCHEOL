import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Info from '@pages/Info.jsx';
import PostDetail from '@pages/PostDetail.jsx';
import PostEdit from '@pages/PostEdit.jsx';
import Login from '@pages/Login.jsx';
import Signup from '@pages/Signup.jsx';
import Home from '@pages/Home.jsx';
import PostNew from '@pages/PostNew.jsx';
import Error from '@pages/Error.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'info',
        children: [
          {
            index: true,
            element: <Info />,
          },
          {
            path: 'new',
            element: <PostNew />,
          },
          {
            path: ':id',
            element: <PostDetail />,
          },
          {
            path: ':id/edit',
            element: <PostEdit />,
          },
        ],
      },
      {
        path: 'user',
        children: [
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'signup',
            element: <Signup />,
          },
        ],
      },
    ],
  },
]);

export default router;
