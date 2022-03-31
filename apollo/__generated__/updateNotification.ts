/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateNotificationInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateNotification
// ====================================================

export interface updateNotification_updateNotification {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface updateNotification {
  updateNotification: updateNotification_updateNotification;
}

export interface updateNotificationVariables {
  input: UpdateNotificationInput;
}
