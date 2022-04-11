import { AnyAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { catchError, map, of, switchMap, filter, tap } from 'rxjs';
import { walletsService } from '../../services';
import { showAlert } from '../../ui';
import {
  createWallet,
  createdWallet,
  createWalletFail,
  editWallet,
  editedWallet,
  editWalletFail,
} from '../actions';
import { AppState } from '../store';

export const createWalletEpic: Epic<AnyAction, AnyAction, AppState> = (
  action$
) =>
  action$.pipe(
    filter(createWallet.match),
    switchMap(({ payload }) =>
      walletsService.createWallet(payload).pipe(
        map((wallet) => createdWallet(wallet)),
        tap(() => showAlert('Wallet successfully created', 'success')),
        catchError(() => {
          showAlert('Wallet creation failed');
          return of(createWalletFail());
        })
      )
    )
  );

export const editWalletEpic: Epic<AnyAction, AnyAction, AppState> = (action$) =>
  action$.pipe(
    filter(editWallet.match),
    switchMap(({ payload }) =>
      walletsService.editWallet(payload.data, payload.id).pipe(
        map((wallet) => editedWallet(wallet)),
        catchError(() => of(editWalletFail()))
      )
    )
  );
