import { ExpensesCalendarComponent } from '../components';
import { useAppSelector, selectCalendarExpenses } from '../../../store';

export const ExpensesContainer = () => {
  const calendarExpenses = useAppSelector(selectCalendarExpenses);
  return <ExpensesCalendarComponent data={calendarExpenses} />;
};
