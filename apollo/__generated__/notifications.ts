/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: notifications
// ====================================================

export interface notifications_notifications_notifications {
  __typename: "Notification";
  id: string;
  /**
   * 상품 id
   */
  product_id: string;
  /**
   * 메시지
   */
  message: string;
  /**
   * 받는이
   */
  recipient_id: string;
  /**
   * 보낸이
   */
  sender_id: string;
  /**
   * 읽음
   */
  read: boolean;
  /**
   * 상품 유형
   */
  type: string;
  created_at: any | null;
}

export interface notifications_notifications {
  __typename: "NotificationsOutput";
  ok: boolean;
  error: string | null;
  notifications: notifications_notifications_notifications[] | null;
}

export interface notifications {
  notifications: notifications_notifications;
}
