import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Form from "../Form/Form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { email, password, confirmPassword } = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };
    if (!checkPassword(password, confirmPassword)) {
      toast.error("Passwords do not match!");
      return;
    }
    if (email && password) {
      setIsLoading(true);
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then(async ({ user }) => {
          console.log(user);
          navigate("/");
          toast.success("You successfully registered!");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Error creating user, please try again.");
        })
        .finally(() => setIsLoading(false));
    }
  };

  const checkPassword = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      return false;
    }
    return true;
  };

  return <Form title="Register" handleSubmit={handleRegister} isLoading={isLoading} />;
};

export default SignUp;
