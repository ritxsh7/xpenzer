import { useEffect, useState } from "react";
import { authApi } from "../api/modules/auth";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "../store/functions/user";

const AuthProvider = ({ children }) => {
  const [fetching, setFetching] = useState(true);

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((store) => store.user);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authApi.autoLogin();
        console.log(res);
        dispatch(saveUser(res.user));
      } catch (error) {
      } finally {
        setFetching(false);
      }
    };
    if (!isAuthenticated) checkAuth();
  }, [dispatch]);

  return !fetching && children;
};

export default AuthProvider;
