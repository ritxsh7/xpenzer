import React from "react";

const InputGroup = ({
  label,
  type,
  state,
  placeholder,
  defaultValue,
  hideOutline,
}) => {
  return (
    <div className="text-left">
      <p className="text-lg text-[#5C6AF5] my-4">{label}</p>
      <input
        ref={state}
        type={type}
        placeholder={placeholder}
        className={"p-4 rounded-md w-full text-lg"}
        defaultValue={defaultValue}
      ></input>
    </div>
  );
};

export default InputGroup;
