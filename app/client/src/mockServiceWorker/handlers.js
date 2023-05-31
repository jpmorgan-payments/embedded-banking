import { rest } from 'msw';

import {
  accountBalanceMock,
  accountsMock,
  casesMock,
  debitCardsMock,
  industryCategoriesMock,
  jobTitlesMock,
  recipientsMock,
  transactionDetailsMock,
  transactionsMock,
} from 'mocks';

import { API_URL } from 'data/constants';

export const handlers = [
  rest.get(`${API_URL}/api/transactions`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(transactionsMock));
  }),
  rest.get(`${API_URL}/api/transactions/:selectedTxnId`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(transactionDetailsMock));
  }),
  rest.get(`${API_URL}/api/recipients`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(recipientsMock));
  }),
  rest.get(`${API_URL}/api/accounts`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(accountsMock));
  }),
  rest.get(`${API_URL}/api/accounts/:accountId/balances`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(accountBalanceMock));
  }),
  rest.get(`${API_URL}/api/debit-cards`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(debitCardsMock));
  }),
  rest.get(`${API_URL}/api/cases`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(casesMock));
  }),
  rest.get(`${API_URL}/api/industry-categories`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(industryCategoriesMock));
  }),
  rest.get(`${API_URL}/api/job-titles`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(jobTitlesMock));
  }),
];
