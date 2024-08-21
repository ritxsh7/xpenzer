import React from "react";
import { IoMdAdd } from "react-icons/io";
import { homeStyles } from "./styles";

const CreateNewIcon = () => {
  return (
    <div className={homeStyles.newIcon}>
      <IoMdAdd />
    </div>
  );
};

export default CreateNewIcon;
