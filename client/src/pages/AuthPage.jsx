import React, { useState } from "react";
import logo from "../assets/logo.png";
import Signup from "../components/auth/Signup";
import Login from "../components/auth/Login";
import Alert from "../components/common/Alert";

const AuthPage = () => {
  //States

  const [authState, setAuthState] = useState({
    login: true,
  });

  const [messages, setMessages] = useState({
    errorMsg: "",
    successMsg: "",
  });

  return (
    <div className="pt-[30%] p-4 flex flex-col items-center justify-center">
      <img src={logo} />
      {authState.login ? (
        <Login setAuthState={setAuthState} setMessages={setMessages} />
      ) : (
        <Signup setAuthState={setAuthState} setMessages={setMessages} />
      )}
      {messages.errorMsg && <Alert type="error">{messages.errorMsg}</Alert>}
      {messages.successMsg && (
        <Alert type="success">{messages.successMsg}</Alert>
      )}
    </div>
  );
};

export default AuthPage;
