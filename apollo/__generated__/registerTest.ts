/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RegisterInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: registerTest
// ====================================================

export interface registerTest_registerTest {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface registerTest {
  registerTest: registerTest_registerTest;
}

export interface registerTestVariables {
  input: RegisterInput;
}
