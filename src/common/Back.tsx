import { useRouter } from 'next/router';
import React, { Fragment, ReactElement } from 'react';

type BackPrpos = {
  children: ReactElement;
};

export default function Back({ children: child }: BackPrpos) {
  const router = useRouter();

  return (
    <Fragment>
      {React.cloneElement(child, {
        onClick: () => router.back(),
      })}
    </Fragment>
  );
}
