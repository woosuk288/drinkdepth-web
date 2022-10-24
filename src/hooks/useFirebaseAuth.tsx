import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from 'src/firebase/services';

type FirebaseAuthHook = {
  user: User | null | undefined;
  loading: boolean;
  error: Error | undefined;
};

const useFirebaseAuth = (): FirebaseAuthHook => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const unlisten = onAuthStateChanged(
      auth,
      (user) => {
        user ? setAuthUser(user) : setAuthUser(null);

        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );
    return () => {
      unlisten();
    };
  }, []);

  return { user: authUser, loading, error };
};

export default useFirebaseAuth;
