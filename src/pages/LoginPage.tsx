import { Box, Container } from "@mui/material";
import React from "react";
import Form from "../components/Form/Form";
import { Link } from "react-router";
import Login from "../components/Login/Login";

const LoginPage = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <h1>Login</h1>
      <Login />
      <br />
      <p>
        <Link to="/register">Register</Link> new account
      </p>
    </Box>
  );
};

export default LoginPage;
