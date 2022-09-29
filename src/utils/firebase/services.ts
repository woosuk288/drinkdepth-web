import {
  addDoc,
  collection,
  collectionGroup,
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
  runTransaction,
  serverTimestamp,
  setDoc,
  startAfter,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { getTestType } from '../combos';
import { COUPON_COUNTER_ISSUED_ID, COUPON_COUNTER_USED_ID } from '../constants';
import { auth, db, storage } from './firebaseInit';

export const DB_CAFES = 'cafes';
export const DB_MENUS = 'menus';
export const DB_REVIEWS = 'reviews';
export const DB_COUPONS = 'coupons';

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

export const fetchCafes = async () => {
  const q = query(collection(db, DB_CAFES));
  const querySnapshot = await getDocs(q);
  const data = getDocsData<CafeType>(querySnapshot);
  return data;
};

export const fetchCafe = async (cafeId: string) => {
  const cafeRef = doc(db, DB_CAFES, cafeId);
  const cafeDoc = await getDoc(cafeRef);

  return getDocData<CafeType>(cafeDoc);
};

export const fetchCafeMenus = async (cafeId: string) => {
  const q = query(collection(db, DB_CAFES, cafeId, DB_MENUS));
  const querySnapshot = await getDocs(q);
  const data = getDocsData<CafeMenuType>(querySnapshot);
  return data;
};

export const fetchCafeMenu = async (cafeId: string, menuId: string) => {
  const menuRef = doc(db, DB_CAFES, cafeId, DB_MENUS, menuId);
  const menuDoc = await getDoc(menuRef);

  return getDocData<CafeMenuType>(menuDoc);
};

export const fetchAllMenus = async () => {
  const q = query(collectionGroup(db, DB_MENUS));
  const querySnapshot = await getDocs(q);
  const data = getDocsData<CafeMenuType>(querySnapshot);
  return data;
};

export const fetchCafeMenuReviews = async (
  cafeId: string,
  menuId: string,
  count: number,
  createdAt: string | Date
) => {
  const q = query(
    collection(db, DB_CAFES, cafeId, DB_MENUS, menuId, DB_REVIEWS),
    orderBy('createdAt', 'desc'),
    limit(count),
    startAfter(createdAt)
  );
  const querySnapshot = await getDocs(q);

  const data = getDocsData<ReviewType>(querySnapshot);
  return data;
};

export const addMenuReview = async ({
  cafeId,
  menuId,
  review,
}: {
  cafeId: string;
  menuId: string;
  review: string;
}) => {
  console.log(cafeId, menuId, review);

  const user = auth.currentUser!;
  console.log('user : ', user);
  const reviewsRef = collection(
    db,
    DB_CAFES,
    cafeId,
    DB_MENUS,
    menuId,
    DB_REVIEWS
  );
  const menuRef = doc(db, DB_CAFES, cafeId, DB_MENUS, menuId);
  const batch = writeBatch(db);

  const newReview: ReviewType = {
    text: review,
    displayName: user.displayName ?? '',
    photoURL: user.photoURL ?? '',
    uid: user.uid,
    createdAt: new Date(),
  };
  const newReviewRef = doc(reviewsRef);

  batch.set(newReviewRef, newReview);
  batch.update(menuRef, { reviewCount: increment(1) });
  await batch.commit();

  return {
    ...newReview,
    id: newReviewRef.id,
  };
};

export const deleteMenuReview = async ({
  cafeId,
  menuId,
  reviewId,
}: {
  cafeId: string;
  menuId: string;
  reviewId: string;
}) => {
  const reviewRef = doc(
    db,
    DB_CAFES,
    cafeId,
    DB_MENUS,
    menuId,
    DB_REVIEWS,
    reviewId
  );
  const menuRef = doc(db, DB_CAFES, cafeId, DB_MENUS, menuId);
  const batch = writeBatch(db);

  batch.delete(reviewRef);
  batch.update(menuRef, { reviewCount: increment(-1) });
  await batch.commit();
};

export const issueCoupon = async ({
  cafeId,
  customerId,
}: {
  cafeId: string;
  customerId: string;
}) => {
  const result = runTransaction(db, async (tx) => {
    const counterRef = doc(db, DB_COUPONS, COUPON_COUNTER_ISSUED_ID);
    const counterDoc = await tx.get(counterRef);
    const counter = getDocData<CouponCounterType>(counterDoc);

    const type = getTestType();

    const nextTotal = (counter?.total ?? 0) + 1;
    const nextCounter = {
      [type]: increment(1),
      total: increment(1),
    };
    const nextCode = nextTotal.toString(10).padStart(6, '0');

    const couponRef = doc(db, DB_COUPONS, nextCode);
    const newCouponDoc = await tx.get(couponRef);

    if (newCouponDoc.exists()) {
      throw '쿠폰 코드 중복 오류!';
    } else {
      tx.set(counterRef, nextCounter, { merge: true });

      const newCoupon: CouponType = {
        code: nextCode,
        cafeId,
        customerId,
        typeIssued: type,
        isUsed: false,
        createdAt: serverTimestamp() as any,
      };
      tx.set(couponRef, newCoupon);

      return '쿠폰 발급 완료!';
    }
  });

  return result;
};

export const checkOpenCoupon = async (code: string) => {
  const couponRef = doc(db, DB_COUPONS, code);

  const type = getTestType();

  runTransaction(db, async (tx) => {
    const couponDoc = await tx.get(couponRef);
    const coupon = getDocData<CouponType>(couponDoc);

    if (!coupon) {
      throw '등록되지 않은 코드 입니다.';
    } else if (coupon.isUsed === true) {
      throw '이미 사용한 코드 입니다.';
    } else {
      await tx.update(couponRef, { typeUsed: type });
    }
  });

  return;
};

export const acceptCoupon = async ({ code }: { code: string }) => {
  const couponRef = doc(db, DB_COUPONS, code);
  const counterRef = doc(db, DB_COUPONS, COUPON_COUNTER_USED_ID);

  const usedCoupon = runTransaction(db, async (tx) => {
    const couponDoc = await tx.get(couponRef);
    const coupon = getDocData<CouponType>(couponDoc);

    if (!coupon) {
      throw '등록되지 않은 코드 입니다.';
    } else if (coupon.isUsed === true) {
      throw '이미 사용한 코드 입니다.';
    } else {
      const nextCounter = {
        [coupon.typeUsed!]: increment(1),
        total: increment(1),
      };

      tx.update(couponRef, { isUsed: true });
      tx.set(counterRef, nextCounter, { merge: true });
      return '쿠폰 사용 완료!';
    }
  });

  return usedCoupon;
};

export const getImageURLs = async (
  prefix: string,
  name: string,
  subfix: string
) => {
  const sizes = ['240x240', '480x480', '960x960'] as const;

  const urls = await Promise.all(
    sizes.map((size) => {
      const url = prefix + name + `_` + size + subfix;
      console.log('url : ', url);

      const imageRef = ref(storage, url);
      return getDownloadURL(imageRef);
    })
  );

  const images = urls.reduce((acc, cur, i) => {
    const key = sizes[i];
    acc[key] = cur;
    return acc;
  }, {} as ImagesType);
  return images;
};

export const updateImages = async (
  firestorePath: string,
  prefix: string,
  filename: string,
  suffix: string
) => {
  const docRef = doc(db, firestorePath);
  const docSnap = await getDoc(docRef);
  const data: any = getDocData(docSnap);

  console.log('data : ', data.name);

  if (docSnap.exists()) {
    // const prefix = 'images/menus/babacarmel/';
    // const name = menu.category + ' - ' + menu.name;
    // const suffix = '.jpg';
    const images = await getImageURLs(prefix, filename, suffix);
    updateDoc(docRef, { images });
  }
};

export const createMenu = async (menu: CafeMenuType, images: ImagesType) => {
  const { id, ...data } = menu;

  const docRef = doc(db, DB_CAFES, data.cafeId, DB_MENUS, id);
  setDoc(docRef, { ...data, images });

  return '완료';
};
