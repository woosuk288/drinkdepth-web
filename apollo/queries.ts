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

export const NOTIFICATIONS_QUERY = gql`
  query notifications {
    notifications {
      ok
      error
      notifications {
        id
        product_id
        message
        etc
        recipient_id
        sender_id
        read
        type
        created_at
      }
    }
  }
`;

export const NOTIFICATION_QUERY = gql`
  query notification($input: NotificationInput!) {
    notification(input: $input) {
      ok
      error
      product {
        id
        image
        title
      }
      senderCompany {
        id
        company_name
        president_name
        telephone
      }
      recipientCompany {
        id
        company_name
        president_name
        telephone
      }
    }
  }
`;
