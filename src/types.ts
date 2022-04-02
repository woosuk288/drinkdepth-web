import { DocumentReference, Timestamp } from 'firebase/firestore/lite';

export type BlogEntry = {
  id: string;
  name: string;
  header_image: string;
  content: any[];
  // gold_text: string,
  // created_at: Date;
  created_at: string;
  publish_date: string | null;
  // reviewed: boolean,
  status: string;
  tags: string[];
};

export type BlogEntryFire = Omit<BlogEntry, 'created_at' | 'publish_date'> & {
  created_at: Timestamp;
  publish_date: Timestamp;
};

export type Company = {
  id: string;
  business_number: string;
  company_name: string;
  president_name: string;
  opening_date: string;
  business_licence: string;
  telephone: string;
  is_valid: boolean;
  uid: string;
  updated_at?: string;
  created_at: string;
};
