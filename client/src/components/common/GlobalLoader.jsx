import ClipLoader from "react-spinners/ClipLoader";

import React from "react";

const GlobalLoader = ({ loading }) => {
  return (
    <ClipLoader
      color="#83D3E2"
      width="100%"
      cssOverride={{
        position: "fixed",
        top: "50%",
        right: "50%",
        translate: "50% 0",
      }}
      loading={loading}
    />
  );
};

export default GlobalLoader;
