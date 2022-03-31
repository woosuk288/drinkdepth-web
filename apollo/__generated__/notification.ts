/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NotificationInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: notification
// ====================================================

export interface notification_notification_product {
  __typename: "NotiProduct";
  id: string;
  image: string;
  title: string;
}

export interface notification_notification_senderCompany {
  __typename: "NotiCompany";
  id: string;
  /**
   * 회사이름
   */
  company_name: string;
  /**
   * 대표자성명
   */
  president_name: string;
  telephone: string;
}

export interface notification_notification_recipientCompany {
  __typename: "NotiCompany";
  id: string;
  /**
   * 회사이름
   */
  company_name: string;
  /**
   * 대표자성명
   */
  president_name: string;
  telephone: string;
}

export interface notification_notification {
  __typename: "NotificationOutput";
  ok: boolean;
  error: string | null;
  product: notification_notification_product | null;
  senderCompany: notification_notification_senderCompany | null;
  recipientCompany: notification_notification_recipientCompany | null;
}

export interface notification {
  notification: notification_notification;
}

export interface notificationVariables {
  input: NotificationInput;
}
