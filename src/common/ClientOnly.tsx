import React, { ReactNode, useEffect, useState } from 'react';

type ClientOnlyProps = {
  children: ReactNode;
  [x: string]: any;
};

export default function ClientOnly({
  children,
  ...delegated
}: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}
