import { Expense, ExpenseFormData } from '@iosoft/billytime-core';
import { from, Observable } from 'rxjs';
import { AWS_INSTANCE } from './instances';

export const expensesService = {
  load: (): Observable<Expense[]> =>
    from(AWS_INSTANCE.get('/expenses').then((res) => res.data)),
  create: (data: ExpenseFormData): Observable<Expense> =>
    from(AWS_INSTANCE.post('/expenses', data).then((res) => res.data)),
};
