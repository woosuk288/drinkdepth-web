/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateBookmarkInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createBookmark
// ====================================================

export interface createBookmark_createBookmark {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface createBookmark {
  createBookmark: createBookmark_createBookmark;
}

export interface createBookmarkVariables {
  input: CreateBookmarkInput;
}
