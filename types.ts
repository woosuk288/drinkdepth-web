import { Timestamp } from 'firebase/firestore';

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
