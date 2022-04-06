import { ExpensesCalendarComponent } from '../components';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector, selectExpenses } from '../../../store';
import { selectCalendarExpenses } from '../../../store/selectors';

const ExpensesCalendarContainer = () => {
  const calendarExpenses = useAppSelector(selectCalendarExpenses);
  return <ExpensesCalendarComponent data={calendarExpenses} />;
};

export const ExpensesContainer = () => {
  const expenses = useAppSelector(selectExpenses);

  if (expenses.type === 'Pending') {
    return <CircularProgress />;
  }

  if (expenses.type === 'Done') {
    return <ExpensesCalendarContainer />;
  }

  return null;
};
