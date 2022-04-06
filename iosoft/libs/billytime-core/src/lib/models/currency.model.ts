import { Dictionary } from "./general.model";

export interface Currency extends Dictionary {}

export const CURRENCY_DICTIONARY: Currency[] = [
  {
    id: 0,
    label: 'Złoty',
    value: 'zł',
  },
  {
    id: 1,
    label: 'Dollar',
    value: '$',
  },
  {
    id: 2,
    label: 'Euro',
    value: 'euro',
  },
];
