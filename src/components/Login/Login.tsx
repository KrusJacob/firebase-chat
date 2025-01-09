import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import Form from "../Form/Form";
import { useNavigate } from "react-router";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = { email: formData.get("email") as string, password: formData.get("password") as string };

    if (data.email && data.password) {
      setIsLoading(true);
      const auth = getAuth();
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then(async ({ user }) => {
          console.log(user);
          const token = await user.getIdToken();
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: token,
            })
          );
          navigate("/");
        })
        .catch(() => alert("Invalid user!"))
        .finally(() => setIsLoading(false));
    }
  };

  const handleWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    setIsLoading(true);
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        navigate("/");
      })
      .catch((error) => alert("Invalid user!"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Form
      title="Sign in"
      handleSubmit={handleLogin}
      handleLoginWithGoodle={handleWithGoogle}
      isLoading={isLoading}
    />
  );
};

export default Login;
