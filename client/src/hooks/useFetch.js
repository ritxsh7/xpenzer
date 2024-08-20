import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError } from "../store/functions/ux";
import { useCallback, useEffect, useState } from "react";

const useFetch = (fetcher, params) => {
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch();
  const ux = useSelector((store) => store.ux);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let res;
      params ? (res = await fetcher(...params)) : (res = await fetcher());
      setResponse(res);
    } catch (err) {
      dispatch(setError(err));
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) fetchData();
    return () => {
      isMounted = false;
    };
  }, [fetchData]);

  return { response: response?.data, loading: ux.loading };
};

export default useFetch;
