/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateNotificationInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createNotification
// ====================================================

export interface createNotification_createNotification {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface createNotification {
  createNotification: createNotification_createNotification;
}

export interface createNotificationVariables {
  input: CreateNotificationInput;
}
