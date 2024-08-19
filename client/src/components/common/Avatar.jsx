import React from "react";
import Avatar from "react-avatar";
import colors from "../../utils/colors.js";

const AvatarComp = ({ name, color }) => {
  const index = Math.floor(Math.random() * colors.length);
  return (
    <Avatar
      name={name}
      round
      size="35"
      color={color}
      fgColor="white"
      textSizeRatio={1.25}
    />
  );
};

export default AvatarComp;
