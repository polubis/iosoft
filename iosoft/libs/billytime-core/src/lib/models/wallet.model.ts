import { Currency } from './currency.model';
import { Description, Id } from './general.model';

export interface Wallet {
  id: Id;
  name: string;
  description: Description;
  currency: Currency;
  balance: number;
  color: string;
}

export interface WalletFormData {
  name: string;
  description: string;
  color: string;
  currency: string;
}