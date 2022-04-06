import { AnyAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { catchError, map, of, switchMap, filter } from 'rxjs';
import { expensesService } from '../../services';
import {
  createdExpense,
  createExpense,
  createExpenseFail,
  loadedExpenses,
  loadExpenses,
  loadExpensesFail,
} from '../slices';
import { AppState } from '../store';

export const expensesEpic: Epic<AnyAction, AnyAction, AppState> = (action$) =>
  action$.pipe(
    filter(loadExpenses.match),
    switchMap(() =>
      expensesService.loadExpenses().pipe(
        map((expenses) => loadedExpenses(expenses)),
        catchError(() => of(loadExpensesFail()))
      )
    )
  );

export const expensesCreationEpic: Epic<AnyAction, AnyAction, AppState> = (
  action$
) =>
  action$.pipe(
    filter(createExpense.match),
    switchMap(({ payload }) =>
      expensesService.createExpense(payload).pipe(
        map((expenses) => createdExpense(expenses)),
        catchError(() => of(createExpenseFail()))
      )
    )
  );

// export const expenseUpdateEpic: Epic<AnyAction, AnyAction, AppState> = (
//   action$
// ) =>
//   action$.pipe(
//     filter(createExpense.match),
//     switchMap(({ payload: { id, data } }) =>
//       expensesService.putOne(id, data).pipe(
//         map((expenses) => createdExpense(expenses)),
//         catchError(() => of(createExpenseFail()))
//       )
//     )
//   );
