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
