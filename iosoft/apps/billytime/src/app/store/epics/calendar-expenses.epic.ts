import { AnyAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { catchError, map, of, switchMap, filter, concat } from 'rxjs';
import { expensesService, walletsService } from '../../services';
import {
  createdExpense,
  createExpense,
  createExpenseFail,
  loadedExpenses,
  loadedWallets,
  loadExpenses,
  loadExpensesFail,
  loadWallets,
  loadWalletsFail,
} from '../actions';
import { AppState } from '../store';

export const calendarExpensesEpic: Epic<AnyAction, AnyAction, AppState> = (
  action$
) => {
  return action$.pipe(
    filter(loadWallets.match),
    switchMap(() =>
      concat(
        of(loadExpenses()),
        walletsService.loadWallets().pipe(
          map((wallets) => loadedWallets(wallets)),
          catchError(() => of(loadWalletsFail()))
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
