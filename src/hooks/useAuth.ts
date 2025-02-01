import { signOut } from "firebase/auth";

import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export function useAuth() {
  const [user, loading, error] = useAuthState(auth);

  const logout = () => {
    signOut(auth);
  };

  return { isAuth: !!user, user, token: user?.getIdToken(), id: user?.uid, logout, loading };
}
