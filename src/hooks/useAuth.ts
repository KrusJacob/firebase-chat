import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useAppSelector } from "../store";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export function useAuth() {
  // const [user, setUser] = useState<User | null>(null);
  // const [loading, setLoading] = useState(true);
  // const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const logout = () => {
    signOut(auth);
  };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, []);

  return { isAuth: !!user, user, token: user?.getIdToken(), id: user?.uid, logout, loading };
}
