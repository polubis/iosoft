import { ExpensesCalendarComponent } from './components';
import CircularProgress from '@mui/material/CircularProgress';
import {
  useAppSelector,
  selectExpenses,
  loadExpenses,
  useAppDispatch,
} from '../../store';
import { useEffect } from 'react';

export const ExpensesModule = () => {
  const expenses = useAppSelector(selectExpenses);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadExpenses());
  }, []);

  if (expenses.type === 'Pending') {
    return <CircularProgress />;
  }

  if (expenses.type === 'Done') {
    return <ExpensesCalendarComponent data={expenses.data} />;
  }

  return null;
};
