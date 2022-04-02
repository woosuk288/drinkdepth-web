/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Posts
// ====================================================

export interface Posts_posts_posts_content {
  __typename: "PostContent";
  type: string;
  value: string;
}

export interface Posts_posts_posts {
  __typename: "Post";
  id: string;
  name: string;
  image_url: string;
  content: Posts_posts_posts_content[];
  publish_date: any;
  status: string;
  tags: string[];
}

export interface Posts_posts {
  __typename: "PostsOutput";
  error: string | null;
  ok: boolean;
  posts: Posts_posts_posts[] | null;
}

export interface Posts {
  posts: Posts_posts;
}
