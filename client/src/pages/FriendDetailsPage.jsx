import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/home/Header";
import friendsApi from "../api/modules/friends";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../store/functions/ux";
import TransactionList from "../components/friends/TransactionList";

const FriendDetailsPage = () => {
  /* FriendDetailsPage here */

  //url params
  const { id } = useParams();

  //states
  const [transactions, setTransactions] = useState([]);

  //store
  const { friends } = useSelector((store) => store.friends);
  const dispatch = useDispatch();

  //fetch details
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        dispatch(setLoading(true));
        const { data } = await friendsApi.getTransactions(id);
        setTransactions(data.transactions);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchTransactions();
  }, [id]);

  return (
    <div className="p-5">
      <Header />
      <p>Friend id {id}</p>
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default FriendDetailsPage;
