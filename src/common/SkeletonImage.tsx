import { Skeleton } from '@mui/material';
import { useState } from 'react';

type SkeletonImageProps = {
  url: string;
  alt: string;
};

export function SkeletonImage({ url, alt }: SkeletonImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <img
        alt={alt}
        style={{
          objectFit: 'contain',
          width: '100%',
          height: '100%',
          display: loaded ? 'block' : 'none',
        }}
        src={url}
        onLoad={() => setLoaded(false)}
      />
      {!loaded && (
        <Skeleton
          variant="rectangular"
          style={{
            objectFit: 'contain',
            width: '100%',
            height: '100%',
          }}
        />
      )}
    </>
  );
}
