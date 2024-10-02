import React from "react";
import Contributor from "./Contributor";
import { spendingsApi } from "../../api/modules/spendings";
import useFetch from "../../hooks/useFetch";

const ContributorList = ({ id, open, inChat }) => {
  const { response } = useFetch(spendingsApi.getById, { id });
  if (response) {
    if (response.length > 0) {
      return (
        <div
          className={` ${
            open ? "max-h-[300px] py-1 mt-2" : "max-h-0 py-0"
          } overflow-hidden transition-all duration-200 ease-in-out`}
        >
          {response?.map((contri) => (
            <Contributor key={contri.contri_id} contri={contri} inChat />
          ))}
        </div>
      );
    }
    return (
      <p
        className={` ${
          open ? "max-h-[300px] py-1 mt-2" : "max-h-0 py-0"
        } text-xs text-blue-500 overflow-hidden transition-all duration-200 ease-in-out`}
      >
        There were no contributors for this spending
      </p>
    );
  }
};

export default ContributorList;
