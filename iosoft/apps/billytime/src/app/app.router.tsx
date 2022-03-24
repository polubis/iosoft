import { Route, Routes } from 'react-router-dom';
import { APP_ROUTER_CONFIG } from './app.router.config';

import { ExpensesModule } from './modules/expenses';

const ELEMENTS = [
  () => <div>Dashboard</div>,
  () => <div>Alarms</div>,
  ExpensesModule,
];

export const AppRouter = () => {
  return (
    <Routes>
      {APP_ROUTER_CONFIG.map((route, idx) => {
        const Element = ELEMENTS[idx];

        return (
          <Route key={route.path} path={route.path} element={<Element />} />
        );
      })}
    </Routes>
  );
};
