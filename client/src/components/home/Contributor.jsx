import React from "react";
import AvatarComp from "../common/Avatar";

const Contributor = (contri) => {
  return (
    <div className="px-2 py-2 flex items-center justify-between">
      <div className="text-lg flex items-center gap-3">
        <AvatarComp
          name={contri.contri_username}
          color={contri.profile_color}
        />
        <p>{contri.contri_username} </p>
      </div>
      <div>
        <p className="text-lime-500">₹{contri.contri_amount}</p>
      </div>
    </div>
  );
};

export default Contributor;
