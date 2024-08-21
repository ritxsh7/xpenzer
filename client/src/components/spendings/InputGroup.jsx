import React from "react";
import { spendingStyles } from "./styles";

const InputGroup = ({ label, type, state, placeholder, defaultValue }) => {
  return (
    <div className="text-left">
      <p className={spendingStyles.form.input.label}>{label}</p>
      <input
        ref={state}
        required
        type={type}
        placeholder={placeholder}
        className={spendingStyles.form.input.field}
        defaultValue={defaultValue}
      ></input>
    </div>
  );
};

export default InputGroup;
