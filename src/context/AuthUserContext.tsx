import { User } from 'firebase/auth';
import { createContext, useContext, Context } from 'react';
import useFirebaseAuth from '../hooks/useFirebaseAuth';

type AuthContextType = {
  user: User | null | undefined;
  loading: boolean;
  error: Error | undefined;
};

const authUserContext = createContext<AuthContextType>({
  user: undefined,
  loading: true,
  error: undefined,
});

export function AuthUserProvider({ children }: { children: React.ReactNode }) {
  const { user, loading, error } = useFirebaseAuth();

  return (
    <authUserContext.Provider value={{ user, loading, error }}>
      {loading ? null : children}
    </authUserContext.Provider>
  );
}
// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext);
