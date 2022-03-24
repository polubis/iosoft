import { ExpensesCalendarComponent } from './components';
import {
  CostVo,
  CurrencyVo,
  ExpenseCategory,
  ExpenseVo,
  BalanceVo,
} from './models';
import { addDays } from 'date-fns';

export const ExpensesModule = () => {
  return (
    <ExpensesCalendarComponent
      data={[
        new ExpenseVo(
          0,
          'Potatos',
          ExpenseCategory.Food,
          new CostVo(100),
          new Date(),
          new BalanceVo(2200),
          new CurrencyVo('$'),
          ''
        ),
        new ExpenseVo(
          1,
          'Carrot',
          ExpenseCategory.Food,
          new CostVo(250),
          addDays(new Date(), 2),
          new BalanceVo(2330),
          new CurrencyVo('$'),
          ''
        ),
        new ExpenseVo(
          2,
          'Carrot',
          ExpenseCategory.Food,
          new CostVo(250),
          addDays(new Date(), 2),
          new BalanceVo(2200),
          new CurrencyVo('$'),
          ''
        ),
        new ExpenseVo(
          3,
          'Carrot',
          ExpenseCategory.Food,
          new CostVo(250),
          addDays(new Date(), 2),
          new BalanceVo(2200),
          new CurrencyVo('$'),
          ''
        ),
      ]}
    />
  );
};
