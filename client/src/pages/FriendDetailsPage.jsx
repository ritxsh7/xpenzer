import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/home/Header";
import friendsApi from "../api/modules/friends";
import { useSelector } from "react-redux";
import TransactionList from "../components/friends/TransactionList";
import UserIcon from "../components/common/UserIcon";
import StatsCard from "../components/friends/StatsCard";
import styles from "../components/friends/styles";
import DateRangePicker from "../components/common/DateRangePicker";
import { defaultDateRange } from "../utils/date";
import GlobalLoader from "../components/common/GlobalLoader";
import SettleDialog from "../components/friends/SettleDialog";
import Modal from "../components/common/Modal";
import { toast } from "react-toastify";

const FriendDetailsPage = () => {
  /* FriendDetailsPage here */

  //url params
  const { id } = useParams();
  const { start, end } = defaultDateRange();

  //states
  const [settling, setSettling] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [settleModalOpen, setSettleModalOpen] = useState(false);

  const [dateRange, setDateRange] = useState({
    start,
    end,
  });

  const settleBalance = async (fid) => {
    try {
      setLoading(true);
      const response = await friendsApi.settleBalance(fid);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setSettleModalOpen(false);
    }
  };

  //store
  const { friends } = useSelector((store) => store.data);

  const friend = friends?.find((f) => f.friend_id == Number(id));

  //fetch details

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data } = await friendsApi.getTransactions(
        id,
        dateRange.start,
        dateRange.end
      );
      setTransactions(data.transactions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [id, dateRange, settling]);

  if (!friend || loading) return <GlobalLoader loading={true} />;

  return (
    <div>
      <UserIcon
        name={friend?.friend_name}
        color={friend?.profile_color}
        text="Transactions with"
      />
      <div className={styles.friendsPage.stats}>
        {Number(friend?.net_balance) < 0 ? (
          <StatsCard
            fullWidth
            up
            color="bg-lime-600"
            score={Number(friend?.net_balance * -1) || 0}
            name={`${friend?.friend_name} owes you `}
          />
        ) : (
          <StatsCard
            fullWidth
            color="bg-red-600"
            score={Number(friend?.net_balance) || 0}
            name={`You owe ${friend?.friend_name} `}
          />
        )}
      </div>
      {Number(friend?.net_balance) < 0 && (
        <SettleDialog handleClick={setSettleModalOpen} />
      )}
      <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />

      <TransactionList transactions={transactions} setSettling={setSettling} />

      <Modal
        open={settleModalOpen}
        onToggle={setSettleModalOpen}
        onConfirm={() => settleBalance(friend?.friend_id)}
        text={`Settling balance would set the balance between you and ${friend?.friend_name} to ₹ 0`}
      />
    </div>
  );
};

export default FriendDetailsPage;
