import React from "react";
import { Container, Box, Typography } from "@mui/material";
import { CustomBox } from "../../utils/styles";
import LoginForm from "../../components/loginform/auth/LoginForm";

const Login = () => {
  return (
    <Container
      sx={{
        width: "100vw",
        py: "3rem",
      }}
    >
      <CustomBox>
        <Typography variant="h4" textAlign="center" my="1rem">
          Welcome back!
        </Typography>
        <Typography variant="p" textAlign="center">
          Login to continue
        </Typography>
      </CustomBox>
      <LoginForm />
    </Container>
  );
};

export default Login;
