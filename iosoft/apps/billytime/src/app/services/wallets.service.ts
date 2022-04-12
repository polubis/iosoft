import {
  EditWalletFormData,
  Wallet,
  WalletFormData,
} from '@iosoft/billytime-core';
import { from, Observable } from 'rxjs';
import { AWS_INSTANCE } from './instances';

export const walletsService = {
  load: (): Observable<Wallet[]> =>
    from(AWS_INSTANCE.get('/wallets').then((res) => res.data)),
  create: (formData: WalletFormData): Observable<Wallet> =>
    from(AWS_INSTANCE.post('/wallets', formData).then((res) => res.data)),
  edit: ({ id, data }: EditWalletFormData): Observable<Wallet> =>
    from(AWS_INSTANCE.patch(`/wallets/${id}`, data).then((res) => res.data)),
};
