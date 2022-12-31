import { getAuth, signOut, User } from 'firebase/auth';
import {
  arrayUnion,
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  Firestore,
  getCountFromServer,
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
  where,
  writeBatch,
} from 'firebase/firestore';
import {
  deleteObject,
  FirebaseStorage,
  getDownloadURL,
  listAll,
  ref,
  uploadString,
} from 'firebase/storage';
import { deleteKakaoAuthCookie } from 'src/utils/kakaoAPI';
import { getTestType } from '../utils/combos';
import {
  COUPON_COUNTER_ISSUED_ID,
  COUPON_COUNTER_USED_ID,
} from '../utils/constants';

export const DB_CAFES = 'cafes';
export const DB_MENUS = 'menus';
export const DB_REVIEWS = 'reviews';
export const DB_COUPONS = 'coupons';

export const DB_PROFILES = 'profiles';
export const DB_PRIVACIES = 'privacies';
export const DB_BADGES = 'badges';

const DOC_FLAVOR = 'flavor';
const DOC_KEYWORD = 'keyword';

export function getDocData<T>(doc: DocumentSnapshot<DocumentData>) {
  if (doc.exists()) {
    const updatedAt =
      typeof doc.data().updatedAt === 'object'
        ? doc.data()?.updatedAt?.toDate().toISOString()
        : doc.data().updatedAt;

    const createdAt =
      typeof doc.data().createdAt === 'object'
        ? doc.data()?.createdAt?.toDate().toISOString()
        : doc.data().createdAt;

    return {
      ...doc.data(),
      id: doc.id,
      ...(updatedAt && { updatedAt }),
      ...(createdAt && { createdAt }),
    } as unknown as T;
  } else {
    return undefined;
  }
}

export function getDocsData<T>(query: QuerySnapshot<DocumentData>) {
  return query.docs.map((doc) => getDocData(doc) as T);
}

export const CREATE = (id?: string) => ({
  createdAt: new Date().toISOString(),
  ...(id && { id }),
});
export const UPDATE = () => ({ updatedAt: new Date().toISOString() });

export const fetchCafeMenuReviews = async (
  db: Firestore,
  cafeId: string,
  menuId: string,
  count: number,
  createdAt: string
) => {
  const q = query(
    collection(db, DB_CAFES, cafeId, DB_MENUS, menuId, DB_REVIEWS),
    orderBy('createdAt', 'desc'),
    limit(count),
    startAfter(createdAt)
  );
  const querySnapshot = await getDocs(q);

  const data = getDocsData<B2BReviewType>(querySnapshot);
  return data;
};

export const addMenuReview = async ({
  db,
  newReview,
}: {
  db: Firestore;
  newReview: B2BReviewType;
}) => {
  const reviewsRef = collection(
    db,
    DB_CAFES,
    newReview.cafeId,
    DB_MENUS,
    newReview.menuId,
    DB_REVIEWS
  );
  const menuRef = doc(
    db,
    DB_CAFES,
    newReview.cafeId,
    DB_MENUS,
    newReview.menuId
  );
  const batch = writeBatch(db);

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
  db,
  cafeId,
  menuId,
  reviewId,
}: {
  db: Firestore;
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
  db,
  cafeId,
  customerId,
}: {
  db: Firestore;
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

export const checkOpenCoupon = async (db: Firestore, code: string) => {
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

export const acceptCoupon = async ({
  db,
  code,
}: {
  db: Firestore;
  code: string;
}) => {
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
  storage: FirebaseStorage,
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
  console.log('images : ', images);

  return images;
};

export const updateImages = async (
  db: Firestore,
  storage: FirebaseStorage,
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
    const images = await getImageURLs(storage, prefix, filename, suffix);
    updateDoc(docRef, { images });
  }
};

//
// 관리용
//

export const createMenu = async (
  db: Firestore,
  menu: CafeMenuType,
  images: ImagesType
) => {
  const { id, ...data } = menu;

  const docRef = doc(db, DB_CAFES, data.cafeId, DB_MENUS, id);
  setDoc(docRef, { ...data, images });

  return '완료';
};

export const batchUpdate = async (db: Firestore, data: any[]) => {
  const batch = writeBatch(db);

  data.forEach((item) => {
    const docRef = doc(db, DB_CAFES, 'babacarmel', DB_MENUS, item.id);
    batch.update(docRef, { ownerComment: item.ownerComment });
  });

  await batch.commit();
};

/**
 * d
 */
export const createReview = async ({
  db,
  storage,
  id,
  ...review
}: DReviewType & { db: Firestore; storage: FirebaseStorage }) => {
  const newReviewRef = doc(collection(db, DB_REVIEWS));
  const uid = review.profile.uid;

  const uploadTasks = await Promise.all(
    review.images.map((image) =>
      uploadString(
        ref(storage, `d/${DB_REVIEWS}/${newReviewRef.id}/${uid}/${image.name}`),
        image.url,
        'data_url'
      )
    )
  );

  const imageURLs = await Promise.all(
    uploadTasks.map((task) => getDownloadURL(task.ref))
  );
  const images = review.images.map((image, i) => ({
    ...image,
    url: imageURLs[i],
  }));

  const newReview: Omit<DReviewType, 'id'> = {
    ...review,
    images,
    createdAt: new Date().toISOString(),
  };

  const batch = writeBatch(db);

  batch.set(newReviewRef, newReview);

  const profileRef = doc(db, DB_PROFILES, uid);
  batch.set(profileRef, { reviewCount: increment(1) }, { merge: true });

  const userFlavorRef = doc(db, DB_PROFILES, uid, DB_PRIVACIES, DOC_FLAVOR);
  review.coffee?.flavors?.length &&
    batch.set(
      userFlavorRef,
      { names: arrayUnion(...review.coffee.flavors) },
      { merge: true }
    );
  const userKeywordRef = doc(db, DB_PROFILES, uid, DB_PRIVACIES, DOC_KEYWORD);
  review.keywords?.length &&
    batch.set(
      userKeywordRef,
      { names: arrayUnion(...review.keywords) },
      { merge: true }
    );

  await batch.commit();

  return { ...newReview, id: newReviewRef.id };
};

export const editReview = async ({
  db,
  storage,
  id,
  createdAt,
  ...review
}: DReviewType & { db: Firestore; storage: FirebaseStorage }) => {
  if (!id) throw '리뷰가 존재하지 않습니다.';

  const uid = review.profile.uid;

  const uploadTasks = await Promise.all(
    review.images.map((image) =>
      image.url.startsWith('data:image')
        ? uploadString(
            ref(storage, `d/${DB_REVIEWS}/${id}/${uid}/${image.name}`),
            image.url,
            'data_url'
          )
        : image.url
    )
  );

  const imageURLs = await Promise.all(
    uploadTasks.map((task) =>
      typeof task === 'string' ? task : getDownloadURL(task.ref)
    )
  );
  const images = review.images.map((image, i) => ({
    ...image,
    url: imageURLs[i],
  }));

  const validStr =
    process.env.NODE_ENV === 'production' ? 'https://' : 'http://';
  const isValid = images.every((image) => image.url.startsWith(validStr));

  if (!isValid) {
    throw '이미지 업로드 중 오류가 발생했습니다.';
  }

  const batch = writeBatch(db);
  const reviewRef = doc(db, DB_REVIEWS, id);
  const updatedAt = new Date().toISOString();
  const nextReview = { ...review, images, updatedAt };
  batch.update(reviewRef, nextReview as DReviewType);

  const profileRef = doc(db, DB_PROFILES, uid);
  batch.set(profileRef, { reviewCount: increment(1) }, { merge: true });

  const userFlavorRef = doc(db, DB_PROFILES, uid, DB_PRIVACIES, DOC_FLAVOR);
  review.coffee?.flavors?.length &&
    batch.set(
      userFlavorRef,
      { names: arrayUnion(...review.coffee.flavors) },
      { merge: true }
    );
  const userKeywordRef = doc(db, DB_PROFILES, uid, DB_PRIVACIES, DOC_KEYWORD);
  review.keywords?.length &&
    batch.set(
      userKeywordRef,
      { names: arrayUnion(...review.keywords) },
      { merge: true }
    );

  await batch.commit();

  return { ...nextReview, id };
};

export const fetchMyReviews = async (
  db: Firestore,
  uid: string,
  createdAt: Date
) => {
  const LIMIT = 15;

  const q = query(
    collection(db, DB_REVIEWS),
    where('profile.uid', '==', uid),
    orderBy('createdAt', 'desc'),
    limit(LIMIT),
    startAfter(createdAt)
  );
  const querySnapshot = await getDocs(q);

  return getDocsData<DReviewType>(querySnapshot);
};

export const fetchMyReviewCount = async (db: Firestore, uid: string) => {
  const q = query(
    collection(db, DB_REVIEWS),
    where('profile.uid', '==', uid),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};

export const fetchReview = async (db: Firestore, reviewId: string) => {
  const reviewDoc = doc(db, DB_REVIEWS, reviewId);
  const reviewSnap = await getDoc(reviewDoc);
  const review = getDocData<DReviewType>(reviewSnap);

  return review;
};

export const fetchReviews = async (db: Firestore, createdAt: Date) => {
  const LIMIT = 15;

  const q = query(
    collection(db, DB_REVIEWS),
    orderBy('createdAt', 'desc'),
    limit(LIMIT),
    startAfter(createdAt)
  );
  const querySnapshot = await getDocs(q);

  return getDocsData<DReviewType>(querySnapshot);
};

export const fetchReviewCount = async (db: Firestore) => {
  const q = query(collection(db, DB_REVIEWS), orderBy('createdAt', 'desc'));

  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};

export const fetchProfile = async (db: Firestore, profileId: string) => {
  const profileDoc = doc(db, DB_PROFILES, profileId);
  const profileSnap = await getDoc(profileDoc);
  const profile = getDocData<ProfileType>(profileSnap);

  return profile;
};

export const updateProfile = async () => {};

export const logoutKakao = async () => {
  const auth = getAuth();
  // kakao logout?
  const uid = auth.currentUser?.uid;
  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/kakao/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uid,
    }),
  });

  deleteKakaoAuthCookie();

  // firebase logout
  return signOut(auth);
};

export const deleteReview = async ({
  db,
  storage,
  reviewId,
  uid,
}: {
  db: Firestore;
  storage: FirebaseStorage;
  reviewId: string;
  uid: string;
}) => {
  const reviewRef = doc(db, DB_REVIEWS, reviewId);
  const dir = await listAll(ref(storage, `d/${DB_REVIEWS}/${reviewId}/${uid}`));
  await Promise.all(dir.items.map((item) => deleteObject(item)));

  const batch = writeBatch(db);

  batch.delete(reviewRef);

  const profileRef = doc(db, DB_PROFILES, uid);
  batch.update(profileRef, { reviewCount: increment(-1) });

  await batch.commit();

  return reviewId;
};

/**
 * 개국공신 배지 증정용 임시
 */
export async function giveEventBadge(db: Firestore, user: User) {
  const ref = doc(db, DB_PROFILES, user.uid);

  const profile = {
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
  };

  await updateDoc(ref, { badgeIds: arrayUnion('00010'), hasNewBadge: true });

  const badgeRef = doc(db, DB_PROFILES, user.uid, DB_BADGES, '00010');
  await setDoc(badgeRef, { ...CREATE('00010'), profile, isNew: true });
}

export const fetchMyBadges = async (db: Firestore, uid: string) => {
  const q = query(collection(db, DB_PROFILES, uid, DB_BADGES));
  const querySnapshot = await getDocs(q);

  const data = getDocsData<UserBadgeType>(querySnapshot);
  return data;
};

export const checkNewBadge = async ({
  db,
  uid,
  badgeId,
}: {
  db: Firestore;
  uid: string;
  badgeId: string;
}) => {
  const ref = doc(db, DB_PROFILES, uid, DB_BADGES, badgeId);
  await updateDoc(ref, { isNew: false });
};

export const hideNewBadge = async ({
  db,
  uid,
}: {
  db: Firestore;
  uid: string;
}) => {
  const ref = doc(db, DB_PROFILES, uid);
  await updateDoc(ref, { hasNewBadge: false });
};
