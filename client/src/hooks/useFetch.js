import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError } from "../store/functions/ux";
import { useEffect, useState } from "react";

const useFetch = (fetcher, params = [], dispatcher) => {
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch();
  const ux = useSelector((store) => store.ux);

  useEffect(() => {
    // Fetch data from api

    const fetchData = async () => {
      /* fetch data body here */

      dispatch(setLoading(true));
      try {
        const res = await fetcher(params);
        setResponse(res);
        if (dispatcher) {
          dispatch(dispatcher(res.data));
        }
      } catch (err) {
        console.log(err);
        dispatch(setError(err));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchData();
  }, []);

  return { response: response?.data, loading: ux.loading };
};

export default useFetch;
