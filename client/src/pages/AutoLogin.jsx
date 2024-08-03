import { useEffect, useState } from "react";
import { authApi } from "../api/modules/auth";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../store/functions/user";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/functions/ux";

const AutoLogin = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        dispatch(setLoading(true));
        const res = await authApi.autoLogin();
        dispatch(saveUser(res.user));
        if (res) navigate("/");
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
        setWaiting(false);
      }
    };
    loadUser();
  }, []);

  return !waiting && children;
};

export default AutoLogin;
