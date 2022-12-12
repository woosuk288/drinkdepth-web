import { useRouter } from 'next/router';

type RedirectPageProps = {
  path: string;
};

function RedirectPage({ path }: RedirectPageProps) {
  const router = useRouter();
  // Make sure we're in the browser
  if (typeof window !== 'undefined') {
    router.replace({
      pathname: path,
      query: { previousPath: router.asPath },
    });
  }

  return null;
}

export default RedirectPage;
