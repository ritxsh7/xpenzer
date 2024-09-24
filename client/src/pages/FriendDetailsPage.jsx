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

const FriendDetailsPage = () => {
  /* FriendDetailsPage here */

  //url params
  const { id } = useParams();
  const { start, end } = defaultDateRange();

  //states
  const [transactions, setTransactions] = useState([]);
  const [lendings, setLendings] = useState(0);
  const [borrowings, setBorrowings] = useState(0);
  const [loading, setLoading] = useState(false);

  const [dateRange, setDateRange] = useState({
    start,
    end,
  });

  //store
  const { friends } = useSelector((store) => store.friends);

  const friend = friends.find((f) => f.friend_id == Number(id));

  //fetch details
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const { data } = await friendsApi.getTransactions(
          id,
          dateRange.start,
          dateRange.end
        );
        setTransactions(data.transactions);
        setLendings(data.lendings || 0);
        setBorrowings(data.borrowings || 0);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [id, dateRange]);

  return (
    friend && (
      <div className="p-5">
        <Header />
        <UserIcon
          name={friend.friend_name}
          color={friend.profile_color}
          text="Transactions with"
        />
        <div className={styles.friendsPage.stats}>
          <StatsCard
            color="bg-lime-500"
            score={Number(lendings)}
            name="Lendings"
          />
          <StatsCard
            color="bg-red-500"
            score={Number(borrowings)}
            name="Borrowings"
          />
        </div>
        <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
        <TransactionList transactions={transactions} />
        <GlobalLoader loading={loading} />
      </div>
    )
  );
};

export default FriendDetailsPage;
