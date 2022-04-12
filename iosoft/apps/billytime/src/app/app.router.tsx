import { Route, Routes } from 'react-router-dom';
import { APP_ROUTER_CONFIG } from './app.router.config';
import { ExpensesModule } from './modules/expenses';
import { App } from './app';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={APP_ROUTER_CONFIG.app.path} element={<App />}>
        <Route
          path={APP_ROUTER_CONFIG.dashboard.path}
          element={<div>Dashboard</div>}
        />
        <Route
          path={APP_ROUTER_CONFIG.alarms.path}
          element={<div>Alarms</div>}
        />
        <Route
          path={APP_ROUTER_CONFIG.expenses.path}
          element={<ExpensesModule />}
        />
      </Route>
    </Routes>
  );
};
