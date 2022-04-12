import { Id, WalletFormData } from '@iosoft/billytime-core';
import { from } from 'rxjs';
import { AWS_INSTANCE } from './instances';

export const walletsService = {
  loadWallets: () => from(AWS_INSTANCE.get('/wallets').then((res) => res.data)),
  creating: (formData: WalletFormData) =>
    from(AWS_INSTANCE.post('/wallets', formData).then((res) => res.data)),
  editing: (formData: WalletFormData, id: Id) =>
    from(
      AWS_INSTANCE.patch(`/wallets/${id}`, formData).then((res) => res.data)
    ),
};
