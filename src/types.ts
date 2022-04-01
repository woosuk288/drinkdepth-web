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

export type Coffee = {
  id: string;

  name: string;
  main_image: string;
  description: string;
  tags: string[];
  taste_body: string;
  taste_sweet: string;
  taste_bitter: string;
  taste_sour: string;
  type: string;
  roasting: string;
  // roasting_date: Date;
  roasting_date: string;
  process: string;

  public: boolean;
  brand: string;
  company: DocumentReference;
  // related_coffee: EntityReference[];

  uid: string;
  // created_at: Date;
  created_at: string;
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
