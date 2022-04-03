import { Skeleton } from '@mui/material';
import { useState } from 'react';

type SkeletonImageProps = {
  url: string;
  alt: string;
  style?: React.CSSProperties;
};

export function SkeletonImage({ url, alt, style }: SkeletonImageProps) {
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
          ...style,
        }}
        src={url}
        onLoad={() => setLoaded(true)}
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
