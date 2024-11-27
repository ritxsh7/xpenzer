import React from "react";
import profileStyles from "../components/profile/styles";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/functions/user";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  /* Profile page comp here */

  //routing
  const navigate = useNavigate();

  //store
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);

  const handleLogout = () => {
    if (user) {
      dispatch(logoutUser());
      navigate("/login");
    }
  };

  return (
    <div className={profileStyles.container}>
      <button className={profileStyles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
