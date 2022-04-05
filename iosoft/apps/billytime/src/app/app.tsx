import { Layout } from './ui';
import { NavBtnLinkComponent } from './components';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { APP_ROUTER_CONFIG } from './app.router.config';
import { Outlet } from 'react-router-dom';

const Navigation = () => (
  <>
    <NavBtnLinkComponent
      to={APP_ROUTER_CONFIG.DASHBOARD.path}
      title={APP_ROUTER_CONFIG.DASHBOARD.title}
    >
      <DashboardIcon />
    </NavBtnLinkComponent>
    <NavBtnLinkComponent
      to={APP_ROUTER_CONFIG.ALARMS.path}
      title={APP_ROUTER_CONFIG.ALARMS.title}
    >
      <AccessAlarmsIcon />
    </NavBtnLinkComponent>
    <NavBtnLinkComponent
      to={APP_ROUTER_CONFIG.EXPENSES.path}
      title={APP_ROUTER_CONFIG.EXPENSES.title}
    >
      <ShoppingCartIcon />
    </NavBtnLinkComponent>
  </>
);

export const App = () => {
  return (
    <Layout>
      <></>
      <Navigation />
      <Outlet />
    </Layout>
  );
};
