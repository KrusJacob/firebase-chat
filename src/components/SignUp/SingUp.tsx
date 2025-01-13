import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Form from "../Form/Form";
import { useNavigate } from "react-router";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = { email: formData.get("email") as string, password: formData.get("password") as string };

    if (data.email && data.password) {
      setIsLoading(true);
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async ({ user }) => {
          console.log(user);
          navigate("/");
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  };

  return <Form title="Register" handleSubmit={handleRegister} isLoading={isLoading} />;
};

export default SignUp;
