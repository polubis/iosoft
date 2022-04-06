import { ExpenseFormData } from '@iosoft/billytime-core';
import { from } from 'rxjs';
import { AWS_INSTANCE } from './instances';

export const expensesService = {
  loadExpenses: () =>
    from(AWS_INSTANCE.get('/expenses').then((res) => res.data)),
  createExpense: (data: ExpenseFormData) =>
    from(AWS_INSTANCE.post('/expenses', data).then((res) => res.data)),
};
