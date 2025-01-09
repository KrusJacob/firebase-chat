import { Box, Container } from "@mui/material";
import React from "react";
import { Link } from "react-router";
import SignUp from "../components/SignUp/SingUp";

const RegisterPage = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <h1>Register</h1>
      <SignUp />
      <br />
      <p>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </Box>
  );
};

export default RegisterPage;
