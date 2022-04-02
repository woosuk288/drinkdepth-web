/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: Post
// ====================================================

export interface Post_post_post_content {
  __typename: "PostContent";
  type: string;
  value: string;
}

export interface Post_post_post {
  __typename: "Post";
  id: string;
  name: string;
  image_url: string;
  content: Post_post_post_content[];
  publish_date: any;
  status: string;
  tags: string[];
}

export interface Post_post {
  __typename: "PostOutput";
  error: string | null;
  ok: boolean;
  post: Post_post_post | null;
}

export interface Post {
  post: Post_post;
}

export interface PostVariables {
  input: PostInput;
}
