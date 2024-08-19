import React, { useEffect, useState } from "react";
import Contributor from "./Contributor";
import { spendingsApi } from "../../api/modules/spendings";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/functions/ux";

const ContributorList = ({ id }) => {
  const [contributors, setContributors] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const getContributors = async () => {
      try {
        dispatch(setLoading(true));
        const result = await spendingsApi.getById(id);
        setContributors(result.data);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    getContributors();
  }, [id]);

  return (
    <div>
      {contributors.map((contri) => (
        <Contributor key={contri.contri_id} {...contri} />
      ))}
    </div>
  );
};

export default ContributorList;
