import { format } from 'date-fns';
import { rest } from 'msw';
import { environment } from '../../environments/environment';
import {
  Expense,
  ExpenseFormData,
  EXPENSE_CATEGORIES,
  EXPENSE_CURRENCY_TYPES,
} from '@iosoft/billytime-core';

const DATA = [
  {
    id: 0,
    name: 'Potatos',
    category: {
      label: 'Food',
      value: 'food',
    },
    cost: 100,
    date: format(new Date(), 'yyyy-MM-dd'),
    balance: 2220,
    currency: {
      label: 'Dollar',
      value: '$',
    },
    description: null,
  },
  {
    id: 1,
    name: 'Potatos',
    category: {
      label: 'Food',
      value: 'food',
    },
    cost: 100,
    date: format(new Date(), 'yyyy-MM-dd'),
    balance: 2220,
    currency: {
      label: 'Dollar',
      value: '$',
    },
    description: null,
  },
];

export const handlers = [
  rest.get(environment.API + '/expenses', (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(DATA));
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
      category: EXPENSE_CATEGORIES.find((ct) => ct.value === body.category)!,
      currency: EXPENSE_CURRENCY_TYPES.find(
        (ct) => ct.value === body.currency
      )!,
    };

    return res(ctx.delay(2000), ctx.status(201), ctx.json(resBody));
  }),
  rest.put(environment.API + '/expenses/:id', (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(req.body));
  }),
];