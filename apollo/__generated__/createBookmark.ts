/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateBookmarkInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createBookmark
// ====================================================

export interface createBookmark_createBookmark_bookmark {
  __typename: "Bookmark";
  id: string;
  /**
   * 상품 ID
   */
  product_id: string;
  /**
   * 유형 ( 커피, 차 등 )
   */
  type: string;
  /**
   * 이름
   */
  name: string;
  /**
   * 설명
   */
  description: string;
  /**
   * 이미지
   */
  main_image: string;
  /**
   * 태그
   */
  tags: string[];
  created_at: any | null;
}

export interface createBookmark_createBookmark {
  __typename: "CreateBookmarkOutput";
  ok: boolean;
  error: string | null;
  bookmark: createBookmark_createBookmark_bookmark | null;
}

export interface createBookmark {
  createBookmark: createBookmark_createBookmark;
}

export interface createBookmarkVariables {
  input: CreateBookmarkInput;
}
