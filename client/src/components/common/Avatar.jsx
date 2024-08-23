import React from "react";
import Avatar from "react-avatar";
import colors from "../../utils/colors.js";

const AvatarComp = ({ name, color, size }) => {
  const index = Math.floor(Math.random() * colors.length);
  return (
    <Avatar
      className="avatar-small"
      name={name}
      round
      size={size || "35"}
      color={color}
      fgColor="white"
      textSizeRatio={1.75}
    />
  );
};

export default AvatarComp;
