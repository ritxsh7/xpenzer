import React from "react";
import AvatarComp from "../common/Avatar";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/functions/ux";
import { toast } from "react-toastify";
import friendsApi from "../../api/modules/friends";

const FriendCard = ({ friend, forSearch, added, notAFriend }) => {
  /*FriendCard comp here */

  const dispatch = useDispatch();

  const handleAddFriend = async (contact) => {
    try {
      dispatch(setLoading(true));
      const response = await friendsApi.friendRequest(contact.user_id);
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  };

  return (
    <div
      key={friend.id}
      className={styles.friendCard.wrapper(forSearch, added)}
    >
      <div className={styles.friendCard.avatar}>
        <AvatarComp name={friend.friend_name} />
        <p className={styles.friendCard.name}>{friend.friend_name}</p>
      </div>
      {!forSearch ? (
        notAFriend ? (
          <p
            className="text-blue-500"
            onClick={() => handleAddFriend({ user_id: friend.friend_id })}
          >
            Add as friend
          </p>
        ) : (
          <div className={styles.friendCard.amount(friend.net_balance)}>
            <span>
              {friend.net_balance > 0
                ? " - "
                : friend.net_balance < 0
                ? " + "
                : ""}
            </span>
            ₹{Math.abs(friend.net_balance).toFixed(2)}
          </div>
        )
      ) : added ? (
        <p className="text-red-500">Remove</p>
      ) : (
        <p className="text-blue-500">Add</p>
      )}
    </div>
  );
};

export default FriendCard;
