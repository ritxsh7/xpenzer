import React, { useState } from "react";
import AvatarComp from "../common/Avatar";
import { useNavigate } from "react-router-dom";
import { homeStyles } from "../home/styles";
import GlobalLoader from "../common/GlobalLoader";
import friendsApi from "../../api/modules/friends";
import { toast } from "react-toastify";
import groupsApi from "../../api/modules/groups";
import { useDispatch } from "react-redux";
import { readNotification } from "../../store/functions/data";

const NotificationLayout = ({ noti, setOpen }) => {
  /* NotificationLayout comp here */

  const navigate = useNavigate();

  //states
  const [fetching, setFetching] = useState(false);

  //store
  const dispatch = useDispatch();

  //handlers
  const handleAcceptRequest = async () => {
    try {
      setFetching(true);
      const result = await friendsApi.acceptFriendRequest(noti.sender_id);
      toast.success(result.message);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
      setOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 800);
      navigate("/friends");
      await groupsApi.readNotifications(noti.notification_id);
    }
  };

  const redirectTo = (type) => {
    switch (type) {
      case "MUTUAL_SPENDING":
        return `/friends/transactions/${noti.sender_id}`;
      case "GROUP_SPENDING":
        return `/groups/group/${noti.content.groupId}`;
    }
  };

  const handleNavigation = async () => {
    if (noti.notification_type === "FRIEND_REQ") return;

    dispatch(readNotification(noti.notification_id));

    let url = redirectTo(noti.notification_type);
    setOpen(false);
    navigate(url);
    try {
      await groupsApi.readNotifications(noti.notification_id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={homeStyles.header.notifications.item}>
      <div
        className={homeStyles.header.notifications.noti}
        onClick={handleNavigation}
      >
        <AvatarComp
          name={noti.content.groupName || noti.content.senderName}
          size={25}
        />
        <p className={homeStyles.header.notifications.message}>
          {noti.message}
        </p>
      </div>
      {noti.notification_type === "FRIEND_REQ" && (
        <button
          className={homeStyles.header.notifications.accept}
          onClick={handleAcceptRequest}
        >
          Accept
        </button>
      )}
      <GlobalLoader loading={fetching} />
    </div>
  );
};

export default NotificationLayout;
