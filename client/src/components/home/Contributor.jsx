import React from "react";
import AvatarComp from "../common/Avatar";
import { homeStyles } from "./styles";
import { useSelector } from "react-redux";

const Contributor = ({ contri }) => {
  /* Contributor comp here */

  const { user } = useSelector((store) => store.user);

  return (
    <div className={homeStyles.contributor.container}>
      <div className={homeStyles.contributor.profile}>
        <AvatarComp
          name={contri.contri_username}
          color={contri.profile_color}
          size="20"
        />
        <p className="text-sm">
          {contri.contri_user == user.userId ? "You" : contri.contri_username}
        </p>
      </div>
      <div className={homeStyles.contributor.status}>
        <p className={homeStyles.contributor.amount}>₹{contri.contri_amount}</p>
        {contri.settled && <p> (Paid)</p>}
      </div>
    </div>
  );
};

export default Contributor;
