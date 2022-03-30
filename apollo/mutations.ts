import { gql } from '@apollo/client';

export const CREATE_COMPANY_MUTATION = gql`
  mutation createCompany($input: CreateCompanyInput!) {
    createCompany(input: $input) {
      ok
      error
      company {
        id
      }
      role
    }
  }
`;

export const CREATE_BOOKMARK_MUTATION = gql`
  mutation createBookmark($input: CreateBookmarkInput!) {
    createBookmark(input: $input) {
      ok
      error
      bookmark {
        id
        product_id
        type
        name
        description
        main_image
        tags
        created_at
      }
    }
  }
`;

export const REMOVE_BOOKMARK_MUTATION = gql`
  mutation removeBookmark($id: String!) {
    removeBookmark(id: $id) {
      ok
      error
    }
  }
`;

export const CREATE_NOTIFICATIONS_MUTATION = gql`
  mutation createNotification($input: CreateNotificationInput!) {
    createNotification(input: $input) {
      ok
      error
    }
  }
`;
