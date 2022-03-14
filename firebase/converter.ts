import { Timestamp } from 'firebase/firestore/lite';

/**
 * Timestamp 변환 처리
 */
export const converter = (data: any) => {
  const rData = Object.entries(data).reduce(
    (acc: Record<string, any>, [key, val]) => {
      // console.log('key ||| typeof val : ', key, '|||', typeof val);
      if (typeof val === 'object') {
        acc[key] = (val as Timestamp)?.toDate().toISOString();
        return acc;
      } else {
        acc[key] = val;
        return acc;
      }
    },
    {}
  );

  return rData;
};
