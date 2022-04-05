/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreatePaymentInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreatePayment
// ====================================================

export interface CreatePayment_createPayment_payment_card {
  __typename: "Card";
  company: string;
  number: string;
  installmentPlanMonths: number;
  isInterestFree: boolean;
  approveNo: string;
  useCardPoint: boolean;
  cardType: string;
  ownerType: string;
  acquireStatus: string;
  receiptUrl: string;
}

export interface CreatePayment_createPayment_payment {
  __typename: "Payment";
  mId: string;
  version: string | null;
  paymentKey: string;
  orderId: string;
  orderName: string | null;
  currency: string;
  method: string;
  status: string;
  requestedAt: string;
  approvedAt: string;
  useEscrow: boolean;
  cultureExpense: boolean | null;
  card: CreatePayment_createPayment_payment_card | null;
  virtualAccount: string | null;
  transfer: string | null;
  mobilePhone: string | null;
  giftCertificate: string | null;
  foreignEasyPay: string | null;
  cashReceipt: string | null;
  discount: string | null;
  cancels: string | null;
  secret: string | null;
  type: string | null;
  easyPay: string | null;
  country: string | null;
  failure: string | null;
  totalAmount: number;
  balanceAmount: number;
  suppliedAmount: number | null;
  vat: number | null;
  taxFreeAmount: number | null;
}

export interface CreatePayment_createPayment {
  __typename: "PaymentOutput";
  error: string | null;
  ok: boolean;
  payment: CreatePayment_createPayment_payment | null;
}

export interface CreatePayment {
  createPayment: CreatePayment_createPayment;
}

export interface CreatePaymentVariables {
  input: CreatePaymentInput;
}
