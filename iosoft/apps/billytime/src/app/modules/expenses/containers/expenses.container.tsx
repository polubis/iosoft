import { useAppSelector } from '../../../store';
import { ExpensesCalendarComponent } from '../components';
import { calendarSelector } from '../selectors';

export const ExpensesContainer = () => {
  const data = useAppSelector(calendarSelector.data);
  return <ExpensesCalendarComponent data={data} />;
};
