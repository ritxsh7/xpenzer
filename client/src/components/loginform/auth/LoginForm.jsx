import React from "react";
import { CustomBox } from "../../../utils/styles";
import TextInput from "../common/TextInput.jsx";
import { Alert, Button } from "@mui/material";

const LoginForm = () => {
  return (
    <CustomBox my="1rem">
      <TextInput label="Handlename" placeholder="Handlename" type="text" />
      <TextInput label="Password" placeholder="Password" type="password" />
      {/* <Alert severity="error" sx={{ width: "90%", mt: "3rem" }}>
        Invalid username
      </Alert> */}
      <Button
        variant="contained"
        color="secondary"
        sx={{
          mt: "3rem",
          width: "90%",
          fontWeight: 600,
          p: "0.8rem 0",
          borderRadius: "0.5rem ",
        }}
      >
        Login
      </Button>
    </CustomBox>
  );
};

export default LoginForm;
