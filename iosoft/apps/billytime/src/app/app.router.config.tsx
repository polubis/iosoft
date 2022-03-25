import { ExpensesModule } from './modules/expenses';

export const APP_ROUTER_CONFIG = [
  { path: '', title: 'Dashboard', element: () => <div>Dashboard</div> },
  { path: 'alarms', title: 'Alarms', element: () => <div>Alarms</div> },
  { path: 'expenses', title: 'Expenses', element: ExpensesModule },
];
