import { Layout } from './ui';
import { NavBtnLinkComponent } from './components';
import { Dashboard, AccessAlarm, ShoppingCart } from '@mui/icons-material';
import { APP_ROUTER_CONFIG } from './app.router.config';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import {
  logIn,
  selectLoggedInUser,
  useAppDispatch,
  useAppSelector,
} from './store';
import { CircularProgress } from '@mui/material';

const Navigation = () => (
  <>
    <NavBtnLinkComponent
      to={APP_ROUTER_CONFIG.dashboard.path}
      title={APP_ROUTER_CONFIG.dashboard.title}
    >
      <Dashboard />
    </NavBtnLinkComponent>
    <NavBtnLinkComponent
      to={APP_ROUTER_CONFIG.alarms.path}
      title={APP_ROUTER_CONFIG.alarms.title}
    >
      <AccessAlarm />
    </NavBtnLinkComponent>
    <NavBtnLinkComponent
      to={APP_ROUTER_CONFIG.expenses.path}
      title={APP_ROUTER_CONFIG.expenses.title}
    >
      <ShoppingCart />
    </NavBtnLinkComponent>
  </>
);

export const App = () => {
  const loggedInUser = useAppSelector(selectLoggedInUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logIn({ username: 'exampleuser', password: 'exampleuser' }));
  }, []);

  if (loggedInUser.type === 'Pending') {
    return <CircularProgress />;
  }

  if (loggedInUser.type === 'Done') {
    return (
      <Layout>
        <></>
        <Navigation />
        <Outlet />
      </Layout>
    );
  }

  return null;
};
