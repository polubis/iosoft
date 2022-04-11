import { AnyAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { catchError, map, of, switchMap, filter, tap, concat } from 'rxjs';
import { walletsService } from '../../services';
import { showAlert } from '../../ui';
import {
  createWallet,
  createdWallet,
  createWalletFail,
  editWallet,
  editedWallet,
  editWalletFail,
  idleCreateWallet,
  idleEditWallet,
} from '../actions';
import { AppState } from '../store';

export const createWalletEpic: Epic<AnyAction, AnyAction, AppState> = (
  action$
) =>
  action$.pipe(
    filter(createWallet.match),
    switchMap(({ payload }) =>
      concat(
        walletsService.createWallet(payload).pipe(
          map((wallet) => createdWallet(wallet)),
          tap(() => showAlert('Wallet successfully created', 'success')),
          catchError(() => {
            showAlert('Wallet creation failed');
            return of(createWalletFail());
          })
        ),
        of(idleCreateWallet())
      )
    )
  );

export const editWalletEpic: Epic<AnyAction, AnyAction, AppState> = (action$) =>
  action$.pipe(
    filter(editWallet.match),
    switchMap(({ payload }) =>
      concat(
        walletsService.editWallet(payload.data, payload.id).pipe(
          map((wallet) => editedWallet(wallet)),
          tap(() => showAlert('Wallet successfully edited', 'success')),
          catchError(() => {
            showAlert('Wallet edition failed');
            return of(editWalletFail());
          })
        ),
        of(idleEditWallet())
      )
    )
  );
