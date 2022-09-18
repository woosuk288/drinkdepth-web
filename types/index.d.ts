type CommentType = {
  id?: string;
  comment: string;
  createdAt: Date;
  displayName: string;
  photoURL: string;
  uid: string;
};

type CafeMenuType = {
  id: string;
  name: string;
  description: string;
  labels: string[];
  imageURL: string;
  price: number;
  category: string;
  commentCount: number;
};
