import { Route, Routes } from 'react-router-dom';
import { APP_ROUTER_CONFIG } from './app.router.config';
import { ExpensesModule } from './modules/expenses';
import { App } from './app';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={APP_ROUTER_CONFIG.APP.path} element={<App />}>
        <Route
          path={APP_ROUTER_CONFIG.DASHBOARD.path}
          element={<div>Dashboard</div>}
        />
        <Route
          path={APP_ROUTER_CONFIG.ALARMS.path}
          element={<div>Alarms</div>}
        />
        <Route
          path={APP_ROUTER_CONFIG.EXPENSES.path}
          element={<ExpensesModule />}
        />
      </Route>
    </Routes>
  );
};
