import { Box, Container } from "@mui/material";
import React from "react";
import { Link } from "react-router";
import SignUp from "../components/SignUp/SingUp";
import Title from "../components/UI/TItle/Title";

const RegisterPage = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={2} mt={2}>
      <Title>Register</Title>
      <SignUp />

      <p>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </Box>
  );
};

export default RegisterPage;
