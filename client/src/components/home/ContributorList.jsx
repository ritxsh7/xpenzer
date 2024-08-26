import React from "react";
import Contributor from "./Contributor";
import { spendingsApi } from "../../api/modules/spendings";
import useFetch from "../../hooks/useFetch";

const ContributorList = ({ id }) => {
  const { response } = useFetch(spendingsApi.getById, [id]);
  if (response) {
    if (response.length > 0) {
      return (
        <div className="border-gray-500 mt-2 border-t-[1px] py-1">
          {response?.map((contri) => (
            <Contributor key={contri.contri_id} {...contri} />
          ))}
        </div>
      );
    }
    return (
      <p className="text-xs text-yellow-400 py-4">
        There were no contributors for this spending
      </p>
    );
  }
};

export default ContributorList;
