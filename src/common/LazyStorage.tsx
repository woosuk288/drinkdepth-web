import { getDownloadURL, ref } from 'firebase/storage';
import * as React from 'react';
import { storage } from '../utils/firebase/firebaseInit';
// import NoImage from '/image/logo_name_vertical.png';

const PLACEHOLDER = '/images/logo_name_vertical.png';

interface ILazyStorage {
  storagePath: string;
  alt?: string;
  style?: React.CSSProperties;
}

const LazyStorage: React.FC<ILazyStorage> = ({
  storagePath,
  alt,
  style = {},
}): JSX.Element => {
  // state
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false); // 실제 화면에 보여지고 있는지 여부를 확인
  const [src, setSrc] = React.useState<string>();

  // ref
  const imgRef = React.useRef<HTMLImageElement>(null); // 이미지 태그 요소
  const observer = React.useRef<IntersectionObserver>(); // IntersectionObserver 변수

  // useEffect
  React.useEffect(() => {
    if (!observer.current) {
      // 인스턴스 생성
      observer.current = new IntersectionObserver(intersectionOberserver, {
        // threshold: 0.5, // 확인을 위해 이미지 절반이 나타날 때 로딩한다.
      });
    }
    imgRef.current && observer.current.observe(imgRef.current); // 이미지 태그 관찰 시작

    return () => {
      observer.current?.disconnect();
    };
  }, []);

  // IntersectionObserver 설정
  const intersectionOberserver = (
    entries: IntersectionObserverEntry[],
    io: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 관찰되고 있는 entry가 보여지게 된 다면
        io.unobserve(entry.target); // 관찰 종료
        setIsLoaded(true); // 로딩 체크
      }
    });
  };

  React.useEffect(() => {
    if (isLoaded) {
      getDownloadURL(ref(storage, storagePath)).then((url) => {
        setSrc(url);
      });
    }
  }, [isLoaded, storagePath]);

  return (
    // 화면에 보여지기 전이라면 NoImage, 화면에 보여지고 있다면 src에 해당하는 이미지
    <img
      ref={imgRef}
      src={isLoaded && src ? src : PLACEHOLDER}
      alt={alt}
      style={{ width: '100%', ...style }}
    />
  );
};

export default LazyStorage;
