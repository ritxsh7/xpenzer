import React from "react";
import Contributor from "./Contributor";
import { spendingsApi } from "../../api/modules/spendings";
import useFetch from "../../hooks/useFetch";

const ContributorList = ({ id }) => {
  const { response } = useFetch(spendingsApi.getById, [id]);
  return (
    <div>
      {response?.map((contri) => (
        <Contributor key={contri.contri_id} {...contri} />
      ))}
    </div>
  );
};

export default ContributorList;
