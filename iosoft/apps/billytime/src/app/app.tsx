import { Layout } from './ui';
import { NavBtnLinkComponent } from './components';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { APP_ROUTER_CONFIG } from './app.router.config';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import {
  authorizationAction,
  authorizationSelector,
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
      <DashboardIcon />
    </NavBtnLinkComponent>
    <NavBtnLinkComponent
      to={APP_ROUTER_CONFIG.alarms.path}
      title={APP_ROUTER_CONFIG.alarms.title}
    >
      <AccessAlarmsIcon />
    </NavBtnLinkComponent>
    <NavBtnLinkComponent
      to={APP_ROUTER_CONFIG.expenses.path}
      title={APP_ROUTER_CONFIG.expenses.title}
    >
      <ShoppingCartIcon />
    </NavBtnLinkComponent>
  </>
);

export const App = () => {
  const authorizationStep = useAppSelector(authorizationSelector.step);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      authorizationAction.authorizing({
        username: 'exampleuser',
        password: 'exampleuser',
      })
    );
  }, []);

  if (authorizationStep === 'authorizing') {
    return <CircularProgress />;
  }

  if (authorizationStep === 'authorized') {
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
