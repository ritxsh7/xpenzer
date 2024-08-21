import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError } from "../store/functions/ux";
import { useCallback, useEffect, useState } from "react";

const useFetch = (fetcher, params = []) => {
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch();
  const ux = useSelector((store) => store.ux);

  const fetchData = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const res = await fetcher(...params);
      setResponse(res);
    } catch (err) {
      console.log(err);
      dispatch(setError(err));
    } finally {
      dispatch(setLoading(false));
    }
  }, [fetcher]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  return { response: response?.data, loading: ux.loading };
};

export default useFetch;
