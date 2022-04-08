import { WalletFormData } from '@iosoft/billytime-core';
import { from } from 'rxjs';
import { AWS_INSTANCE } from './instances';

export const walletsService = {
  loadWallets: () => from(AWS_INSTANCE.get('/wallets').then((res) => res.data)),
  createWallet: (payload: WalletFormData) =>
    from(AWS_INSTANCE.post('/wallets', payload).then((res) => res.data)),
};
