import { useRef } from "react";
import React from "react";
import { loginStyles } from "./styles";
import { authApi } from "../../api/modules/auth";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/functions/ux";

const Signup = ({ setAuthState, setMessages }) => {
  /*Signup comp here */

  const dispatch = useDispatch();

  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const usernameRef = useRef(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setMessages({ errorMsg: "Passwords dont match" });
      return;
    }

    const auth = {
      username: usernameRef.current.value,
      phone: phoneRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      dispatch(setLoading(true));
      const res = await authApi.signup(auth);
      console.log(res);
      setMessages({ successMsg: res.message });
      setAuthState({ login: true });
    } catch (error) {
      console.log(error);
      setMessages({ errorMsg: error.message });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <form className={loginStyles.form} onSubmit={handleSignup}>
        <input
          id="username"
          className={loginStyles.input}
          type="text"
          ref={usernameRef}
          required
          placeholder="name eg: Mahesh dalle"
        ></input>
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
        <input
          required
          name="confirm-password"
          className={loginStyles.input}
          type="password"
          ref={confirmPasswordRef}
          placeholder="confirm password"
        ></input>
        <button type="submit" className={loginStyles.button}>
          Sign up
        </button>
        <p>
          Already a user?{" "}
          <span
            className="text-blue-400 underline"
            onClick={() => setAuthState({ login: true })}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
