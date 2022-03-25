import { Route, Routes } from 'react-router-dom';
import { APP_ROUTER_CONFIG } from './app.router.config';

export const AppRouter = () => {
  return (
    <Routes>
      {APP_ROUTER_CONFIG.map((route) => {
        const Element = route.element;

        return (
          <Route key={route.path} path={route.path} element={<Element />} />
        );
      })}
    </Routes>
  );
};
