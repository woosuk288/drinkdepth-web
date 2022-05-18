/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Admin = "Admin",
  Company = "Company",
}

export interface CoffeeInput {
  id: string;
}

export interface CreateBookmarkInput {
  product_id: string;
  type: string;
  name: string;
  description: string;
  image_url: string;
  tags: string[];
}

export interface CreateCompanyInput {
  business_number: string;
  company_name: string;
  president_name: string;
  opening_date: string;
  business_licence: string;
  telephone: string;
}

export interface CreateNotificationInput {
  product_id: string;
  message: string;
  type: string;
}

export interface CreatePaymentInput {
  orderId: string;
  amount: string;
  paymentKey: string;
}

export interface NotificationInput {
  id: string;
}

export interface PostInput {
  id: string;
}

export interface RegisterInput {
  ip?: string | null;
  contact: string;
}

export interface UpdateNotificationInput {
  ids: string[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
