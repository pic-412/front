import PropTypes from 'prop-types';
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from 'react-router-dom';

import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Nav';
import { PATH } from '@/constants/path';
import NotFoundPage from '@/pages/404';
import MainPage from '@/pages/MainPage';
import MyPicPage from '@/pages/MyPicPage';
import ProfileEditPage from '@/pages/ProfileEditPage';
import ProfilePage from '@/pages/ProfilePage';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';

const PrivateRoute = () => {
  const { pathname } = useLocation();

  return <Outlet key={pathname} />;
};

const AppLayout = () => (
  <div className="app-wrapper">
    <Header />
    <main>
      <Outlet />
    </main>
    <Navbar />
  </div>
);
AppLayout.propTypes = {
  includeHeaderNav: PropTypes.bool,
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: PATH.MAIN,
      element: <PrivateRoute />,
      children: [
        {
          element: <AppLayout />,
          children: [
            { index: true, element: <MainPage /> },
            { path: PATH.MYPIC, element: <MyPicPage /> },
            {
              path: PATH.PROFILE,
              children: [
                { index: true, element: <ProfilePage /> },
                { path: PATH.PROFILE_EDIT, element: <ProfileEditPage /> },
              ],
            },
            {
              path: '*',
              element: <NotFoundPage />,
            },
          ],
        },
        {
          element: <AppLayout includeHeaderNav={false} />,
          children: [
            { path: PATH.SIGNIN, element: <SignIn /> },
            { path: PATH.SIGNUP, element: <SignUp /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
