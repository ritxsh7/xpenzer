import { useEffect, useState } from "react";
import { authApi } from "../api/modules/auth";
import { useDispatch } from "react-redux";
import { saveUser } from "../store/functions/user";

const AuthProvider = ({ children }) => {
  const [fetching, setFetching] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authApi.autoLogin();
        dispatch(saveUser(res.user));
        console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
        setFetching(false);
      }
    };
    checkAuth();
  }, [dispatch]);

  return !fetching && children;
};

export default AuthProvider;
