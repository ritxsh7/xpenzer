import React from "react";
import profileStyles from "../components/profile/styles";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/functions/user";
import { useNavigate } from "react-router-dom";
import AvatarComp from "../components/common/Avatar";

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
      <div className={profileStyles.avatar}>
        <AvatarComp
          color={user.profile}
          name={user.username}
          size="40"
          className="scale-150"
        />
        <p className="text-lg">{user.username}</p>
      </div>
      <button className={profileStyles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
