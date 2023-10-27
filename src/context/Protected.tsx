import { Redirect, useRouter, useSegments } from 'expo-router';
import { Dispatch, SetStateAction, createContext, PropsWithChildren, useState, useEffect, useContext } from 'react';

// expo router authentication doc
// https://docs.expo.dev/router/reference/authentication/

type User = {
  id: string;
  name: string;
};

type ProtectedContextProps = {
  user: User | undefined | null;
  setUser: Dispatch<SetStateAction<User | undefined | null>>;
};

const ProtectedContext = createContext<ProtectedContextProps>({} as ProtectedContextProps);

export const ProtectedProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const segments = useSegments();
  // TODO 本来はNull
  const [user, setUser] = useState<User | undefined | null>({
    id: '123',
    name: 'noripi10',
  });

  useEffect(() => {
    const segment = segments[0];
    if (segment !== '(auth)' && !user) {
      router.replace('/(auth)/hero');
    }
  }, [user, segments, router]);

  return <ProtectedContext.Provider value={{ user, setUser }}>{children}</ProtectedContext.Provider>;
};

export const useAuth = () => useContext(ProtectedContext);
