import { useEffect, useState } from "react";
import { authApi } from "../api/modules/auth";
import { useNavigate } from "react-router-dom";

const AutoLogin = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const res = await authApi.autoLogin();
        if (res) navigate("/");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  return !loading && children;
};

export default AutoLogin;
