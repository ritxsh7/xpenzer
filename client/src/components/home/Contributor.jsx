import React from "react";
import AvatarComp from "../common/Avatar";
import { homeStyles } from "./styles";

const Contributor = (contri) => {
  return (
    <div className={homeStyles.contributor.container}>
      <div className={homeStyles.contributor.profile}>
        <AvatarComp
          name={contri.contri_username}
          color={contri.profile_color}
          size="20"
        />
        <p className="text-sm">{contri.contri_username} </p>
      </div>
      <div>
        <p className={homeStyles.contributor.amount}>₹{contri.contri_amount}</p>
      </div>
    </div>
  );
};

export default Contributor;
