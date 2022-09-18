import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  QuerySnapshot,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { cafeMenus } from '../../../pages/cafe/[cafe_id]';
import { auth, db } from './firebaseInit';

// ... 나눠야하나...ㅁ
export const DB_CAFES = 'cafes';
export const DB_MENUS = 'menus';
export const DB_COMMENTS = 'comments';

export function getDocData<T>(doc: DocumentSnapshot<DocumentData>) {
  if (doc.exists()) {
    return {
      id: doc.id,
      ...doc.data(),
      updatedAt: doc.data()?.updatedAt?.toDate().toISOString() || null,
      createdAt: doc.data()?.createdAt?.toDate().toISOString() || null,
    } as unknown as T;
  } else {
    return null;
  }
}

export function getDocsData<T>(query: QuerySnapshot<DocumentData>) {
  return query.docs.map((doc) => getDocData(doc) as T);
}

export const CREATE = (id?: string) => ({
  createdAt: new Date(),
  ...(id && { id }),
});
export const UPDATE = () => ({ updatedAt: new Date() });

export const fetchMenu = async (menuId: string) => {
  const menuRef = doc(db, DB_MENUS, menuId);

  const menuDoc = await getDoc(menuRef);
  return getDocData<CafeMenuType>(menuDoc);
};

export const fetchMenuComments = async ({ queryKey }: { queryKey: any[] }) => {
  const [_, menuId] = queryKey;
  const q = query(
    collection(db, DB_MENUS, menuId, DB_COMMENTS),
    limit(3),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as CommentType)
  );
  return data;
};

export const addMenuComment = async ({
  menuId,
  comment,
}: {
  menuId: string;
  comment: string;
}) => {
  const user = auth.currentUser!;
  const commentsRef = collection(db, DB_MENUS, menuId, DB_COMMENTS);
  const menuRef = doc(db, DB_MENUS, menuId);
  const batch = writeBatch(db);

  const newComment = {
    comment,
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
    createdAt: new Date(),
  };
  const newCommentRef = doc(commentsRef);

  batch.set(newCommentRef, newComment);
  batch.update(menuRef, { commentCount: increment(1) });
  await batch.commit();

  return {
    ...newComment,
    id: newCommentRef.id,
  };
};

export const deleteMenuComment = async ({
  menuId,
  commentId,
}: {
  menuId: string;
  commentId: string;
}) => {
  const commentRef = doc(db, DB_MENUS, menuId, DB_COMMENTS, commentId);
  const menuRef = doc(db, DB_MENUS, menuId);
  const batch = writeBatch(db);

  batch.delete(commentRef);
  batch.update(menuRef, { commentCount: increment(-1) });
  await batch.commit();
};
