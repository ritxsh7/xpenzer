import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GroupHeader from "../components/groups/GroupHeader";
import groupsApi from "../api/modules/groups";
import { FaPlus } from "react-icons/fa";
import groupStyles from "../components/groups/styles";
import {
  addContributor,
  setGroupSpending,
} from "../store/functions/spending.payload";
import { toast } from "react-toastify";
import HeaderSkeleton from "../components/skeletons/HeaderSkeleton";
import ExpenseChat from "../components/groups/ExpenseChat";
import GlobalLoader from "../components/common/GlobalLoader";
import ChatSkeleton from "../components/skeletons/ChatSkeleton";

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
  const [fetching, setFetching] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

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
        setFetching(true);
        const result = await groupsApi.getGroupDetails(groupDetails.group_id);
        setMembers(result.data.users);
        setExpenses(result.data.spendings);
      } catch (error) {
        console.log(error);
      } finally {
        setFetching(false);
      }
    };

    fetchGroupDetails();
  }, [groupDetails]);

  return (
    groupDetails && (
      <div className="">
        {fetching ? (
          <HeaderSkeleton />
        ) : (
          <GroupHeader
            setExpand={setShowInfo}
            expand={showInfo}
            name={groupDetails.group_name}
            profile={groupDetails.group_profile}
            members={members}
          />
        )}
        {fetching ? (
          <ChatSkeleton />
        ) : (
          !showInfo && <ExpenseChat expenses={expenses} />
        )}
        <button className={groupStyles.button} onClick={handleGroupExpense}>
          Create a group expense <FaPlus />
        </button>
        <GlobalLoader loading={fetching} />
      </div>
    )
  );
};

export default GroupChatPage;
