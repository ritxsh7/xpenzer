import React from "react";
import { Box, Typography } from "@mui/material";
import "./TextInput.css";

const TextInput = ({ placeholder, type, label }) => {
  return (
    <Box
      sx={{
        width: "100%",
        my: "1.3rem",
      }}
    >
      <Box
        sx={{
          height: "3.4rem",
          width: "90%",
          margin: "0 auto",
        }}
      >
        <Typography variant="p" fontSize="small" fontWeight="normal">
          {label}
        </Typography>
        <input
          type={type}
          className="text-input"
          placeholder={placeholder}
        ></input>
      </Box>
    </Box>
  );
};

export default TextInput;
