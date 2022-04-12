import { AnyAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { catchError, map, of, switchMap, filter, concat } from 'rxjs';
import { expensesService, walletsService } from '../../services';
import {
  createdExpense,
  createExpense,
  createExpenseFail,
  loadedExpenses,
  walletsActions,
  loadExpenses,
  loadExpensesFail,
} from '../actions';
import { AppState } from '../store';

export const calendarExpensesEpic: Epic<AnyAction, AnyAction, AppState> = (
  action$
) => {
  return action$.pipe(
    filter(walletsActions.loading.match),
    switchMap(() =>
      concat(
        of(loadExpenses()),
        walletsService.loadWallets().pipe(
          map((wallets) => walletsActions.loaded(wallets)),
          catchError(() => of(walletsActions.loadFail()))
        ),
        expensesService.loadExpenses().pipe(
          map((expenses) => loadedExpenses(expenses)),
          catchError(() => of(loadExpensesFail()))
        )
      )
    )
  );
};

export const expenseCreationEpic: Epic<AnyAction, AnyAction, AppState> = (
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
