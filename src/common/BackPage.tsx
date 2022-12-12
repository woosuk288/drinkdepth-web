import { useRouter } from 'next/router';
import { useEffect } from 'react';

function BackPage() {
  const router = useRouter();

  useEffect(() => {
    router.back();
  }, [router]);

  return null;
}

export default BackPage;
