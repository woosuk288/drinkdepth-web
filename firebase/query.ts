import { firestore, storage } from '../firebase/clientApp';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  QueryConstraint,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

const blogCollection = collection(firestore, 'blog');

export const getPosts = async (...queryConstraints: QueryConstraint[]) => {
  const blogQuery = query(
    blogCollection,
    // where('done', '==', false),
    ...queryConstraints
  );
  const querySnapshot = await getDocs(blogQuery);

  const images = await Promise.all(
    querySnapshot.docs.map((doc) =>
      getDownloadURL(ref(storage, doc.data().header_image))
    )
  );

  const posts = querySnapshot.docs.map((doc, i) => {
    return {
      id: doc.id,
      ...doc.data(),
      header_image: images[i],
      publish_date: doc.data().publish_date.toDate().toLocaleDateString(),
      created_at: doc.data().created_at.toDate().toLocaleDateString(),
    };
  });

  return posts;
};

export const getPost = async (id: string) => {
  const docRef = doc(firestore, 'blog', id);
  const result = await getDoc(docRef);

  if (!result.exists()) {
    return null;
  }

  const post = {
    id: docRef.id,
    ...result.data(),
    header_image: await getDownloadURL(
      ref(storage, result.data().header_image)
    ),
    publish_date: result.data().publish_date.toDate().toLocaleDateString(),
    created_at: result.data().created_at.toDate().toLocaleDateString(),
  };

  return post;
};
