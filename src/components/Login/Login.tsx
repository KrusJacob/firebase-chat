import React, { useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Form from "../Form/Form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

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
          navigate("/");
        })
        .catch(() => toast.error("Invalid user!"))
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
      .catch((error) => toast.error("Invalid user!"))
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
