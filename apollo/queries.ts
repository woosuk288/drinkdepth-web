import { gql } from '@apollo/client';

export const BOOKMARKS_QUERY = gql`
  query bookmarks {
    bookmarks {
      ok
      error
      bookmarks {
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
