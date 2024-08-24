import React, { useRef, useState } from "react";
import { loginStyles } from "./styles";
import { authApi } from "../../api/modules/auth";
import Alert from "../common/Alert";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUser } from "../../store/functions/user";
import { setLoading } from "../../store/functions/ux";
import logo from "../../assets/logo.png";
import { GoogleLogin } from "@react-oauth/google";
import response from "../../../../server/helpers/response";

const Login = () => {
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);

  const [messages, setMessages] = useState({
    errorMsg: "",
    successMsg: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // LOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = {
      phone: phoneRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      dispatch(setLoading(true));
      const res = await authApi.login(auth);
      setMessages({ successMsg: res.message });
      dispatch(saveUser(res.user));
      navigate("/");
    } catch (error) {
      navigate("/login");
      console.log(error);
      setMessages({ errorMsg: error.message });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleLogin = (response) => {
    console.log(response);
  };

  const handleGoogleError = (err) => {
    console.log(response);
  };

  return (
    <div className={loginStyles.container}>
      <img src={logo} />
      <h3 className={loginStyles.heading}>{loginStyles.headingText} </h3>
      <form className={loginStyles.form} onSubmit={handleLogin}>
        <input
          id="phone"
          className={loginStyles.input}
          type="text"
          ref={phoneRef}
          required
          placeholder="phone eg: 9876543210"
        ></input>
        <input
          required
          id="password"
          name="current-password"
          className={loginStyles.input}
          type="password"
          ref={passwordRef}
          placeholder="password"
        ></input>
        <button type="submit" className={loginStyles.button}>
          Login
        </button>
        <div className="flex flex-col gap-4">
          OR
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={handleGoogleError}
          />
        </div>
      </form>
      {messages.errorMsg && <Alert type="error">{messages.errorMsg}</Alert>}
      {messages.successMsg && (
        <Alert type="success">{messages.successMsg}</Alert>
      )}
    </div>
  );
};

export default Login;
