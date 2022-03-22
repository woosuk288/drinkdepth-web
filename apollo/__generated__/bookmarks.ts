/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: bookmarks
// ====================================================

export interface bookmarks_bookmarks_bookmarks {
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

export interface bookmarks_bookmarks {
  __typename: "BookmarksOutput";
  ok: boolean;
  error: string | null;
  bookmarks: bookmarks_bookmarks_bookmarks[] | null;
}

export interface bookmarks {
  bookmarks: bookmarks_bookmarks;
}
