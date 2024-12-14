import { createBrowserRouter, Outlet, RouterProvider, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { PATH } from '@/constants/path';

import MainPage from '@/pages/MainPage';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import MyPicPage from '@/pages/MyPicPage';
import ProfilePage from '@/pages/ProfilePage';
import ProfileEditPage from '@/pages/ProfileEditPage';
import LocationPage from '@/pages/LocationPage';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Nav';

const PrivateRoute = () => {
  const { pathname } = useLocation();

  return <Outlet key={pathname} />;
};

const AppLayout = ({ includeHeaderNav = true }) => (
  <div className="app-wrapper">
    <Header />
    <main>
      <Outlet />
    </main>
    {includeHeaderNav && <Navbar />}
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
            { path: PATH.LOCATION, element: <LocationPage /> },
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
