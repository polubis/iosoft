import { Layout } from './ui';
import { NavBtnLinkComponent } from './components';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppRouter } from './app.router';
import { APP_ROUTER_CONFIG } from './app.router.config';

const ICONS = [<DashboardIcon />, <AccessAlarmsIcon />, <ShoppingCartIcon />];

export const App = () => {
  return (
    <Layout>
      <></>
      <>
        {APP_ROUTER_CONFIG.map((route, idx) => (
          <NavBtnLinkComponent
            key={route.path}
            to={route.path}
            title={route.title}
          >
            {ICONS[idx]}
          </NavBtnLinkComponent>
        ))}
      </>
      <AppRouter />
    </Layout>
  );
};
