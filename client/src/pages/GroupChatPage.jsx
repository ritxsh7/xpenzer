import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GroupHeader from "../components/groups/GroupHeader";
import { FaPlus } from "react-icons/fa";
import groupStyles from "../components/groups/styles";
import {
  addContributor,
  setGroupSpending,
} from "../store/functions/spending.payload";
import { toast } from "react-toastify";
import ExpenseChat from "../components/groups/ExpenseChat";

const GroupChatPage = () => {
  /*GroupChatPage comp here */

  //routing
  const { id } = useParams();
  const navigate = useNavigate();

  //store
  const dispatch = useDispatch();
  const { groups, friends } = useSelector((store) => store.data);
  const groupDetails = groups?.find((group) => group.group_id == id);
  const friendsMap = new Map(friends?.map((f) => [f.friend_id, f]));

  //states
  const [members, setMembers] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  //handlers

  const handleGroupExpense = () => {
    for (const member of members) {
      if (!friendsMap.has(member.user_id)) {
        toast.error("You are not friends with " + member.username);
        return;
      }
      dispatch(
        addContributor({
          friend_id: member.user_id,
          friend_name: member.username,
          isRegistered: true,
          amount: 0,
        })
      );
    }
    dispatch(setGroupSpending(groupDetails));
    navigate("/new-spending");
  };

  return (
    <div className="hide-scrollbar">
      <GroupHeader
        setExpand={setShowInfo}
        expand={showInfo}
        groupDetails={groupDetails}
        members={members}
        setMembers={setMembers}
      />
      {!showInfo && <ExpenseChat />}

      <button className={groupStyles.button} onClick={handleGroupExpense}>
        Create a group expense <FaPlus />
      </button>
    </div>
  );
};

export default GroupChatPage;
