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
        image_url
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

export const UPDATE_NOTIFICATIONS_MUTATION = gql`
  mutation updateNotification($input: UpdateNotificationInput!) {
    updateNotification(input: $input) {
      ok
      error
    }
  }
`;

export const CREATE_PAYMENT_MUTATION = gql`
  mutation CreatePayment($input: CreatePaymentInput!) {
    createPayment(input: $input) {
      error
      ok
      payment {
        mId
        version
        paymentKey
        orderId
        orderName
        currency
        method
        status
        requestedAt
        approvedAt
        useEscrow
        cultureExpense
        card {
          company
          number
          installmentPlanMonths
          isInterestFree
          approveNo
          useCardPoint
          cardType
          ownerType
          acquireStatus
          receiptUrl
        }
        virtualAccount
        transfer
        mobilePhone
        giftCertificate
        foreignEasyPay
        cashReceipt
        discount
        cancels
        secret
        type
        easyPay
        country
        failure
        totalAmount
        balanceAmount
        suppliedAmount
        vat
        taxFreeAmount
      }
    }
  }
`;
