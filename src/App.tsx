import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router-dom';
import { PATH } from '@/constants/path';
import RootLayout from '@/layouts/Root';
import HomePage from '@/pages/HomePage';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import MyPicPage from '@/pages/MyPicPage';
import ProfilePage from '@/pages/ProfilePage';
import ProfileEditPage from '@/pages/ProfileEditPage';
import LocationPage from '@/pages/LocationPage';
import Header from './components/layout/Header';
import Navbar from './components/layout/Nav';

const PrivateRoute = () => {
  const { pathname, search } = useLocation();

  return <Outlet />;
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: PATH.HOME,
      element: <PrivateRoute />,
      children: [
        {
          element: (
            <div className="app-wrapper">
              <Header />
              <main>
                <Outlet />
              </main>
              <Navbar />
            </div>
          ),
          children: [
            { index: true, element: <HomePage /> },
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
        { path: PATH.SIGNIN, element: <SignIn /> },
        { path: PATH.SIGNUP, element: <SignUp /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
