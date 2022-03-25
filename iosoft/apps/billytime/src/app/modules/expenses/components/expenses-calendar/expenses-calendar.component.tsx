import { useState } from 'react';
import { Expense, ExpenseFormData } from '@iosoft/billytime-core';
import css from './expenses-calendar.module.less';
import { addDays, format, getWeekOfMonth } from 'date-fns';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TodayIcon from '@mui/icons-material/Today';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { ExpenseFormModalComponent } from '../expense-form-modal';
import {
  createExpense,
  selectExpenseCreationStatus,
  useAppDispatch,
  useAppSelector,
} from 'apps/billytime/src/app/store';

interface ExpensesCalendarComponentProps {
  data: Expense[];
}

type GroupedData = Record<string, Expense[] | undefined>;

const DATE_FORMAT = 'MM/dd/yyyy';

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const generateWeek = (from: Date): Date[] => {
  return Array.from({ length: DAYS.length - 1 }).reduce<Date[]>(
    (acc, _, i) => [...acc, addDays(acc[i], 1)],
    [from]
  );
};

const groupData = (data: Expense[]): GroupedData => {
  return data.reduce<GroupedData>((acc, item) => {
    const stringDate = format(new Date(item.date), DATE_FORMAT);
    const dates = acc[stringDate];

    return {
      ...acc,
      [stringDate]: Array.isArray(dates) ? [...dates, item] : [item],
    };
  }, {});
};

const useWeek = (initFromDate = new Date()) => {
  const [week, setWeek] = useState(generateWeek(initFromDate));

  const moveToPreviousWeek = () => {
    setWeek(generateWeek(addDays(week[0], -DAYS.length)));
  };

  const resetWeek = () => {
    setWeek(generateWeek(initFromDate));
  };

  const moveToNextWeek = () => {
    setWeek(generateWeek(addDays(week[0], DAYS.length)));
  };

  return {
    week,
    moveToPreviousWeek,
    moveToNextWeek,
    resetWeek,
  };
};

const pickDataItems = (
  data: GroupedData,
  dates: Date[],
  idx: number
): Expense[] => {
  const items = data[format(dates[idx], DATE_FORMAT)];
  return Array.isArray(items) ? items : [];
};

const calculateDailySum = (expenses: Expense[]): number => {
  return parseFloat(
    expenses.reduce<number>((acc, item) => item.cost + acc, 0).toPrecision(12)
  );
};

export const ExpensesCalendarComponent = ({
  data,
}: ExpensesCalendarComponentProps) => {
  const [expenseFormData, setExpenseFormData] =
    useState<ExpenseFormData | null>(null);
  const [expenseToEditId, setExpenseToEditId] = useState(-1);

  const { week, moveToNextWeek, moveToPreviousWeek, resetWeek } = useWeek();

  const groupedData = groupData(data);

  const nowAsString = format(new Date(), DATE_FORMAT);

  const expenseCreationStatus = useAppSelector(selectExpenseCreationStatus);
  const dispatch = useAppDispatch();

  const isEditMode = expenseToEditId !== -1;

  const handleSubmit = (data: ExpenseFormData) => {
    if (isEditMode) {
      // Handle edit here
    } else {
      dispatch(createExpense(data));
    }
  };

  return (
    <div className={css['root']}>
      <div className={css['toolbox']}>
        <div className={css['datesRange']}>
          {getWeekOfMonth(week[0])} week of {format(week[0], 'MMMM yyyy')}
        </div>

        <div className={css['navigation']}>
          <Tooltip title="Previous week">
            <IconButton onClick={moveToPreviousWeek}>
              <ChevronLeftIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Current week">
            <IconButton
              className={`${
                nowAsString === format(week[0], DATE_FORMAT)
                  ? css['activeNavItem']
                  : ''
              }`}
              onClick={resetWeek}
            >
              <TodayIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Next week">
            <IconButton onClick={moveToNextWeek}>
              <ChevronRightIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className={`${css['container']}`}>
        {week.map((date, dateIdx) => (
          <div className={css['col']} key={dateIdx}>
            <div
              className={`${css['label']} ${
                nowAsString === format(date, DATE_FORMAT)
                  ? css['labelActive']
                  : ''
              }`}
            >
              {DAYS[dateIdx]}
              <span className={css['labelNumber']}>{format(date, 'dd')}</span>
            </div>
            <div className={css['items']}>
              {pickDataItems(groupedData, week, dateIdx).length === 0 ? (
                <div className={css['noItems']}>
                  <IconButton size="large" onClick={() => {}}>
                    <AddShoppingCartIcon />
                  </IconButton>
                  <span>No expense on this day. Click the button to add</span>
                </div>
              ) : (
                pickDataItems(groupedData, week, dateIdx).map((item) => (
                  <div
                    key={item.id}
                    className={css['item']}
                    onClick={() => {
                      setExpenseToEditId(item.id);
                      setExpenseFormData({
                        ...item,
                        currency: item.currency.value,
                        category: item.category.value,
                        description: item.description || '',
                      });
                    }}
                  >
                    <div className={css['itemMarker']}></div>
                    <div className={css['itemContent']}>
                      <header className={css['itemHeader']}>
                        <span className={css['itemTextSmall']}>
                          - {item.cost} {item.currency.value}
                        </span>
                        <span className={css['time']}>
                          {format(new Date(item.date), 'hh:mm')}
                        </span>
                      </header>
                      <span className={css['itemTextBig']}>
                        {item.balance} {item.currency.value}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className={css['summary']}>
              <span className={css['summaryLabel']}>Daily cost</span>
              <span className={css['summaryBigLabel']}>
                {calculateDailySum(pickDataItems(groupedData, week, dateIdx))}{' '}
                {data[0]?.currency.value}
              </span>
            </div>
            <div className={css['footer']}>
              <Button
                startIcon={<AddShoppingCartIcon />}
                onClick={() => {
                  setExpenseFormData({
                    currency: '',
                    category: '',
                    name: '',
                    date: format(new Date(), 'yyyy-MM-dd'),
                    description: '',
                    cost: 0,
                  });
                  setExpenseToEditId(-1);
                }}
              >
                Add expense
              </Button>
            </div>
          </div>
        ))}
      </div>

      {expenseFormData && (
        <ExpenseFormModalComponent
          data={expenseFormData}
          disabled={expenseCreationStatus.type === 'Pending'}
          header={
            isEditMode
              ? `Edit expense ${expenseFormData.name}`
              : 'Create new expense'
          }
          onSubmit={handleSubmit}
          onClose={() => {
            setExpenseFormData(null);
            setExpenseToEditId(-1);
          }}
        />
      )}
    </div>
  );
};
