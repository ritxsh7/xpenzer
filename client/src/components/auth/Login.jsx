import React, { useRef, useState } from "react";
import { loginStyles } from "./styles";
import { authApi } from "../../api/modules/auth";
import Alert from "../common/Alert";
import { useNavigate } from "react-router-dom";
import AutoLogin from "../../pages/AutoLogin";

const Login = () => {
  const handlenameRef = useRef(null);
  const passwordRef = useRef(null);

  const [messages, setMessages] = useState({
    errorMsg: "",
    successMsg: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // LOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = {
      handleName: handlenameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      setLoading(true);
      const res = await authApi.login(auth);
      setMessages({ successMsg: res.message });
      navigate("/");
    } catch (error) {
      setMessages({ errorMsg: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AutoLogin>
      <div className={loginStyles.container}>
        <h1 className="text-3xl font-semibold my-3">Kharcha Paani</h1>
        <h3 className={loginStyles.heading}>{loginStyles.headingText} </h3>
        <form className={loginStyles.form} onSubmit={handleLogin}>
          <input
            id="handlename"
            className={loginStyles.input}
            type="text"
            ref={handlenameRef}
            required
            placeholder="handlename eg: ritesh@123"
          ></input>
          <input
            required
            id="password"
            className={loginStyles.input}
            type="password"
            ref={passwordRef}
            placeholder="password"
          ></input>
          <button type="submit" className={loginStyles.button}>
            Login
          </button>
        </form>
        {messages.errorMsg && <Alert type="error">{messages.errorMsg}</Alert>}
        {messages.successMsg && (
          <Alert type="success">{messages.successMsg}</Alert>
        )}
      </div>
    </AutoLogin>
  );
};

export default Login;
