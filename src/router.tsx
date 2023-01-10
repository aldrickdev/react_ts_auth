import { createBrowserRouter } from 'react-router-dom';

import Root from './pages/Root';
import Home from './pages/Home';
import Login from './pages/Login';
import Account from './pages/Account';
import ConfirmEmailUpdate from './pages/ConfirmEmailUpdate';

// TODO: Add an Error Page

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'account',
        element: <Account />
      },
      {
        path: 'update-email/:id',
        element: <ConfirmEmailUpdate />
      }
    ]
  }
])

export default router