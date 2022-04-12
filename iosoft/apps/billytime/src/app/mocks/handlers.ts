import { format } from 'date-fns';
import { rest } from 'msw';
import { environment } from '../../environments/environment';
import {
  Expense,
  ExpenseFormData,
  EXPENSE_CATEGORIES_DICTIONARY,
  CURRENCY_DICTIONARY,
  Wallet,
  LogInFormData,
  AuthorizedUser,
  WalletFormData,
} from '@iosoft/billytime-core';

const EXPENSES_MOCK: Expense[] = [
  {
    id: 0,
    name: 'Potatos',
    category: EXPENSE_CATEGORIES_DICTIONARY[0],
    cost: 100,
    date: format(new Date(), 'yyyy-MM-dd'),
    balance: 2220,
    currency: CURRENCY_DICTIONARY[0],
    description: null,
    walletId: 0,
  },
  {
    id: 1,
    name: 'Potatos',
    category: EXPENSE_CATEGORIES_DICTIONARY[0],
    cost: 100,
    date: format(new Date(), 'yyyy-MM-dd'),
    balance: 2220,
    currency: CURRENCY_DICTIONARY[0],
    description: null,
    walletId: 1,
  },
];

const WALLETS_MOCK: Wallet[] = [
  {
    id: 0,
    name: 'My euro wallet',
    description: 'Here hold euros',
    balance: 2000,
    currency: CURRENCY_DICTIONARY[0],
    color: '#3376ed',
  },
  {
    id: 1,
    name: 'My euro wallet',
    description: 'Here hold euros',
    balance: 2000,
    currency: CURRENCY_DICTIONARY[0],
    color: '#f5b9dd',
  },
  {
    id: 2,
    name: 'My euro wallet',
    description: 'Here hold euros',
    balance: 2000,
    currency: CURRENCY_DICTIONARY[0],
    color: '#e8d8b7',
  },
  {
    id: 3,
    name: 'My euro wallet',
    description: 'Here hold euros',
    balance: 2000,
    currency: CURRENCY_DICTIONARY[0],
    color: '#c0aaee',
  },
  {
    id: 4,
    name: 'My euro wallet',
    description: 'Here hold euros',
    balance: 2000,
    currency: CURRENCY_DICTIONARY[0],
    color: '#9fcff4',
  },
  {
    id: 5,
    name: 'My euro wallet',
    description: 'Here hold euros',
    balance: 2000,
    currency: CURRENCY_DICTIONARY[0],
    color: '#802bd0',
  },
  {
    id: 6,
    name: 'My euro wallet',
    description: 'Here hold euros',
    balance: 2000,
    currency: CURRENCY_DICTIONARY[0],
    color: '#29b99b',
  },
];

export const handlers = [
  // EXPENSES
  rest.get(environment.API + '/expenses', (req, res, ctx) => {
    return res(ctx.delay(500), ctx.status(200), ctx.json(EXPENSES_MOCK));
  }),
  rest.post(environment.API + '/expenses', (req, res, ctx) => {
    const body = req.body as ExpenseFormData;
    const resBody: Expense = {
      cost: body.cost,
      name: body.name,
      date: body.date,
      description: body.description,
      balance: 1230,
      id: Math.ceil(Math.random() * 100),
      walletId: Math.ceil(Math.random() * 100),
      category: EXPENSE_CATEGORIES_DICTIONARY.find(
        (ct) => ct.value === body.category
      )!,
      currency: CURRENCY_DICTIONARY.find((ct) => ct.value === body.currency)!,
    };

    return res(ctx.delay(2000), ctx.status(201), ctx.json(resBody));
  }),
  rest.put(environment.API + '/expenses/:id', (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(req.body));
  }),

  // AUTHORIZATION
  rest.post(environment.API + '/authorization/log-in', (req, res, ctx) => {
    const body = req.body as LogInFormData;
    const resBody: AuthorizedUser = {
      id: Math.ceil(Math.random() * 100),
      username: body.username,
    };

    return res(ctx.status(201), ctx.json(resBody));
  }),

  // WALLETS
  rest.get(environment.API + '/wallets', (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(WALLETS_MOCK));
  }),

  rest.post(environment.API + '/wallets', (req, res, ctx) => {
    const body = req.body as WalletFormData;
    const resBody: Wallet = {
      id: Math.ceil(Math.random() * 100),
      name: body.name,
      description: body.description,
      currency: CURRENCY_DICTIONARY.find((ct) => ct.value === body.currency)!,
      color: body.color,
      balance: 0,
    };
    return res(ctx.delay(2000), ctx.status(200), ctx.json(resBody));
  }),

  rest.patch(environment.API + '/wallets/:id', (req, res, ctx) => {
    const body = req.body as WalletFormData;
    const resBody: Wallet = {
      id: +(req.params as any).id,
      name: body.name,
      description: body.description,
      currency: CURRENCY_DICTIONARY.find((ct) => ct.value === body.currency)!,
      color: body.color,
      balance: 1200,
    };
    return res(ctx.delay(2000), ctx.status(200), ctx.json(resBody));
  }),
];
