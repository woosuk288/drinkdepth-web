import { Skeleton } from '@mui/material';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { storage } from '../../firebase/clientApp';

type StorageImageProps = {
  storagePath: string;
  alt: string;
};

export function StorageImage({ storagePath, alt }: StorageImageProps) {
  const [url, setUrl] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (storagePath) {
      setLoading(true);
      getDownloadURL(ref(storage, storagePath))
        .then((res) => setUrl(res))
        .finally(() => setLoading(false));
    }
  }, [storagePath]);

  if (loading)
    return (
      <Skeleton
        variant="rectangular"
        style={{
          objectFit: 'contain',
          width: '100%',
          height: '100%',
        }}
      />
    );
  if (!storagePath) return <></>;

  return (
    <img
      alt={alt}
      style={{
        objectFit: 'contain',
        width: '100%',
        height: '100%',
      }}
      src={url}
    />
  );
}
