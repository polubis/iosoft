import { isSameDay, isSameMonth, isSameYear } from 'date-fns';
import { ConvertedDate, ActiveDates } from '../models';
import styles from './days-grid.module.less';

interface DaysGridProps {
  activeDates: ActiveDates;
  dates: ConvertedDate[];
  onDayClick: (date: ConvertedDate) => void;
}

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const isSameDate = (date: Date) => {
  const today = new Date();

  return (
    isSameDay(today, date) &&
    isSameMonth(today, date) &&
    isSameYear(today, date)
  );
};

const DaysGrid = ({ activeDates, dates, onDayClick }: DaysGridProps) => {
  return (
    <div className={styles['root']}>
      <div className={styles['container']}>
        {DAY_NAMES.map((dayName) => (
          <div className={`${styles['name']}`} key={dayName}>
            {dayName}
          </div>
        ))}

        {dates.map((date) => (
          <div
            className={`${styles['item']} ${
              isSameDate(date.original) ? styles['highlighted'] : ''
            } ${activeDates[date.id] ? styles['active'] : ''} ${
              date.type === 'prev' || date.type === 'next'
                ? styles['grey-font']
                : ''
            }`}
            key={date.id}
            onClick={() => onDayClick(date)}
          >
            {date.day}
          </div>
        ))}
      </div>
      <footer></footer>
    </div>
  );
};

export { DaysGrid };
