import { from } from 'rxjs';
import { AWS_INSTANCE } from './instances';

export const walletsService = {
  loadWallets: () =>
    from(AWS_INSTANCE.get('/wallets').then((res) => res.data)),
};
