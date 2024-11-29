import React from "react";
import Avatar from "react-avatar";

const AvatarComp = ({ name, color, size, className }) => {
  /* Avatar comp here */

  return (
    <Avatar
      className={`avatar-small ${className}`}
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
