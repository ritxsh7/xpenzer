import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GroupHeader from "../components/groups/GroupHeader";
import groupsApi from "../api/modules/groups";
import { FaPlus } from "react-icons/fa";
import groupStyles from "../components/groups/styles";
import {
  addContributor,
  savePayload,
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
  const { groups, friends } = useSelector((store) => store.friends);
  const groupDetails = groups.find((group) => group.group_id == id);

  //states
  const [members, setMembers] = useState([]);
  const [expenses, setExpenses] = useState([]);

  //handlers

  const handleGroupExpense = () => {
    dispatch(setGroupSpending({ groupId: groupDetails.group_id }));
    for (const member of members) {
      if (!friends.find((f) => f.friend_id == member.user_id)) {
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
    navigate("/new-spending");
  };

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const result = await groupsApi.getGroupDetails(groupDetails.group_id);
        setMembers(result.data.users);
        setExpenses(result.data.spendings);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGroupDetails();
  }, []);

  return (
    <div className="">
      <GroupHeader
        name={groupDetails.group_name}
        profile={groupDetails.group_profile}
        members={members}
      />
      <ExpenseChat expenses={expenses} />
      <button className={groupStyles.button} onClick={handleGroupExpense}>
        Create a group expense <FaPlus />
      </button>
    </div>
  );
};

export default GroupChatPage;
