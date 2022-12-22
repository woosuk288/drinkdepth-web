import { FirebaseOptions, getApp, initializeApp } from 'firebase/app';
import { getAuth, signOut, User } from 'firebase/auth';
import {
  addDoc,
  arrayUnion,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
  getCountFromServer,
  getDoc,
  getDocs,
  getFirestore,
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
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadString,
} from 'firebase/storage';
import { getProfileId } from 'src/utils/etc';
import { deleteKakaoAuthCookie } from 'src/utils/kakaoAPI';
import { getTestType } from '../utils/combos';
import {
  COUPON_COUNTER_ISSUED_ID,
  COUPON_COUNTER_USED_ID,
} from '../utils/constants';
import { firebaseConfig } from './FirebaseProvider';
// import { auth, db, storage } from './FirebaseProvider';

function createFirebaseApp(config: FirebaseOptions) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

export const app = createFirebaseApp(firebaseConfig);
export const auth = getAuth(app);
// auth.useDeviceLanguage();
export const db = getFirestore(app);
export const storage = getStorage(app);

export const DB_CAFES = 'cafes';
export const DB_MENUS = 'menus';
export const DB_REVIEWS = 'reviews';
export const DB_COUPONS = 'coupons';

export const DB_PROFILES = 'profiles';
export const DB_PRIVACIES = 'privacies';

const DOC_FLAVOR = 'flavor';
const DOC_KEYWORD = 'keyword';

export function getDocData<T>(doc: DocumentSnapshot<DocumentData>) {
  if (doc.exists()) {
    const updatedAt = doc.data()?.updatedAt?.toDate().toISOString();

    return {
      ...doc.data(),
      id: doc.id,
      ...(updatedAt && { updatedAt }),
      createdAt: doc.data()?.createdAt?.toDate().toISOString(),
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
  const user = auth.currentUser!;
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
  console.log('images : ', images);

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

//
// 관리용
//

export const createMenu = async (menu: CafeMenuType, images: ImagesType) => {
  const { id, ...data } = menu;

  const docRef = doc(db, DB_CAFES, data.cafeId, DB_MENUS, id);
  setDoc(docRef, { ...data, images });

  return '완료';
};

export const batchUpdate = async (data: any[]) => {
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
export const createReview = async ({ id, ...review }: CafeMenuReviewType) => {
  const newReviewRef = doc(collection(db, DB_REVIEWS));

  const uploadTasks = await Promise.all(
    review.images.map((image) =>
      uploadString(
        ref(
          storage,
          `d/${DB_REVIEWS}/${newReviewRef.id}/${review.uid}/${image.name}`
        ),
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

  const newReview: Omit<CafeMenuReviewType, 'id'> = {
    ...review,
    images,
    createdAt: new Date(),
  };

  const batch = writeBatch(db);

  batch.set(newReviewRef, newReview);

  const profileId = getProfileId(review.uid);
  const profileRef = doc(db, DB_PROFILES, profileId);
  batch.set(profileRef, { reviewCount: increment(1) }, { merge: true });

  const userFlavorRef = doc(
    db,
    DB_PROFILES,
    profileId,
    DB_PRIVACIES,
    DOC_FLAVOR
  );
  review.coffee?.flavors?.length &&
    batch.set(
      userFlavorRef,
      { names: arrayUnion(...review.coffee.flavors) },
      { merge: true }
    );
  const userKeywordRef = doc(
    db,
    DB_PROFILES,
    profileId,
    DB_PRIVACIES,
    DOC_KEYWORD
  );
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
  id,
  createdAt,
  ...review
}: CafeMenuReviewType) => {
  if (!id) throw '리뷰가 존재하지 않습니다.';

  const uploadTasks = await Promise.all(
    review.images.map((image) =>
      image.url.startsWith('data:image')
        ? uploadString(
            ref(storage, `d/${DB_REVIEWS}/${id}/${review.uid}/${image.name}`),
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

  const isValid = images.every((image) => image.url.startsWith('https://'));

  if (!isValid) {
    throw '이미지 업로드 중 오류가 발생했습니다.';
  }

  const batch = writeBatch(db);
  const reviewRef = doc(db, DB_REVIEWS, id);
  const updatedAt = new Date();
  const nextReview = { ...review, images, updatedAt };
  batch.update(reviewRef, nextReview as CafeMenuReviewType);

  const profileId = getProfileId(review.uid);
  const profileRef = doc(db, DB_PROFILES, profileId);
  batch.set(profileRef, { reviewCount: increment(1) }, { merge: true });

  const userFlavorRef = doc(
    db,
    DB_PROFILES,
    profileId,
    DB_PRIVACIES,
    DOC_FLAVOR
  );
  review.coffee?.flavors?.length &&
    batch.set(
      userFlavorRef,
      { names: arrayUnion(...review.coffee.flavors) },
      { merge: true }
    );
  const userKeywordRef = doc(
    db,
    DB_PROFILES,
    profileId,
    DB_PRIVACIES,
    DOC_KEYWORD
  );
  review.keywords?.length &&
    batch.set(
      userKeywordRef,
      { names: arrayUnion(...review.keywords) },
      { merge: true }
    );

  await batch.commit();

  return { ...nextReview, id };
};

export const fetchMyReviews = async (uid: string, createdAt: Date) => {
  const LIMIT = 15;

  const q = query(
    collection(db, DB_REVIEWS),
    where('uid', '==', uid),
    orderBy('createdAt', 'desc'),
    limit(LIMIT),
    startAfter(createdAt)
  );
  const querySnapshot = await getDocs(q);

  return getDocsData<CafeMenuReviewType>(querySnapshot);
};

export const fetchMyReviewCount = async (uid: string) => {
  const q = query(
    collection(db, DB_REVIEWS),
    where('uid', '==', uid),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};

export const fetchReview = async (reviewId: string) => {
  const reviewDoc = doc(db, DB_REVIEWS, reviewId);
  const reviewSnap = await getDoc(reviewDoc);
  const review = getDocData<CafeMenuReviewType>(reviewSnap);

  return review;
};

export const fetchReviews = async (createdAt: Date) => {
  const LIMIT = 15;

  const q = query(
    collection(db, DB_REVIEWS),
    orderBy('createdAt', 'desc'),
    limit(LIMIT),
    startAfter(createdAt)
  );
  const querySnapshot = await getDocs(q);

  return getDocsData<CafeMenuReviewType>(querySnapshot);
};

export const fetchReviewCount = async () => {
  const q = query(collection(db, DB_REVIEWS), orderBy('createdAt', 'desc'));

  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};

export const fetchProfile = async (profileId: string) => {
  const profileDoc = doc(db, DB_PROFILES, profileId);
  const profileSnap = await getDoc(profileDoc);
  const profile = getDocData<ProfileType>(profileSnap);

  return profile;
};

export const updateProfile = async () => {};

export const logoutKakao = async () => {
  // kakao logout?
  const kakaoUID = auth.currentUser?.uid.replace('kakao:', '');
  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/kakao/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      kakaoUID,
    }),
  });

  deleteKakaoAuthCookie();

  // firebase logout
  return signOut(auth);
};

export const deleteReview = async ({
  reviewId,
  uid,
}: {
  reviewId: string;
  uid: string;
}) => {
  const reviewRef = doc(db, DB_REVIEWS, reviewId);
  const dir = await listAll(ref(storage, `d/${DB_REVIEWS}/${reviewId}/${uid}`));
  await Promise.all(dir.items.map((item) => deleteObject(item)));

  const batch = writeBatch(db);

  batch.delete(reviewRef);

  const profileRef = doc(db, DB_PROFILES, getProfileId(uid));
  batch.update(profileRef, { reviewCount: increment(-1) });

  await batch.commit();

  return reviewId;
};
