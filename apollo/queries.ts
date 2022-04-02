import { gql } from '@apollo/client';

export const POSTS_QUERY = gql`
  query Posts {
    posts {
      error
      ok
      posts {
        id
        name
        image_url
        content {
          type
          value
        }
        publish_date
        status
        tags
      }
    }
  }
`;

export const POST_QUERY = gql`
  query Post($input: PostInput!) {
    post(input: $input) {
      error
      ok
      post {
        id
        name
        image_url
        content {
          type
          value
        }
        publish_date
        status
        tags
      }
    }
  }
`;

export const COFFEES_QUERY = gql`
  query Coffees {
    coffees {
      ok
      coffees {
        id
        name
        image_url
        description
        tags
        taste_body
        taste_sweet
        taste_bitter
        taste_sour
        type
        roasting
        roasting_date
        process
        company_id
        uid
      }
    }
  }
`;

export const COFFEE_QUERY = gql`
  query Coffee($input: CoffeeInput!) {
    coffee(input: $input) {
      ok
      error
      coffee {
        id
        name
        image_url
        description
        tags
        taste_body
        taste_sweet
        taste_bitter
        taste_sour
        type
        roasting
        roasting_date
        process
        company_id
        uid
      }
    }
  }
`;

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
        image_url
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

export const COMPANY_QUERY = gql`
  query Company {
    company {
      ok
      error
      company {
        id
        business_number
        company_name
        president_name
        opening_date
        telephone
        uid
      }
    }
  }
`;
