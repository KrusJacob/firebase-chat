import { Box, Container, Typography } from "@mui/material";
import React from "react";
import Form from "../components/Form/Form";
import { Link } from "react-router";
import Login from "../components/Login/Login";
import Title from "../components/UI/TItle/Title";

const LoginPage = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={2} mt={2}>
      <Title>Login</Title>

      <Login />

      <p>
        <Link to="/register">Register</Link> new account
      </p>
    </Box>
  );
};

export default LoginPage;
