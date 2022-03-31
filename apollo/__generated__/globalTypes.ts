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

export interface CreateBookmarkInput {
  product_id: string;
  type: string;
  name: string;
  description: string;
  main_image: string;
  tags: string[];
}

export interface CreateCompanyInput {
  business_number: string;
  company_name: string;
  president_name: string;
  opening_date: string;
  business_licence: string;
}

export interface CreateNotificationInput {
  product_id: string;
  message: string;
  etc: string[];
  recipient_id: string;
  sender_id: string;
  read: boolean;
  type: string;
}

export interface NotificationInput {
  id: string;
}

export interface UpdateNotificationInput {
  ids: string[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
