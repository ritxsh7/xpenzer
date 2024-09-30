import React, { useState, useEffect, useRef } from "react";
import ExpenseItem from "./ExpenseItem";
import groupsApi from "../../api/modules/groups";
import { useParams } from "react-router-dom";
import groupStyles from "./styles";
import GlobalLoader from "../common/GlobalLoader";

const ExpenseChat = () => {
  /* ExpenseChat here */

  //url
  const { id } = useParams();

  const containerEnd = useRef(null);
  const chatContainer = useRef(null);
  const [expenses, setExpenses] = useState([]);
  const [page, setPage] = useState(0);
  const [fetching, setFetching] = useState(false);

  //handlers
  const fetchSpendings = async () => {
    try {
      setFetching(true);
      const result = await groupsApi.getGroupExpenses(id, page);
      const data = result.data;
      setExpenses([...expenses, ...data]);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  const scrollToBottom = () => {
    if (containerEnd.current) {
      containerEnd.current.scrollIntoView({ behaviour: "smooth" });
    }
  };

  const fetchMore = () => {
    const { scrollTop, scrollHeight } = chatContainer.current;
    if (scrollTop * -1 + window.innerHeight >= scrollHeight) {
      setPage(page + 1);
    }
  };

  //effects
  useEffect(() => {
    if (chatContainer.current)
      chatContainer.current.addEventListener("scroll", fetchMore);
  }, []);

  useEffect(() => {
    fetchSpendings();
  }, [page]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className={groupStyles.chat.wrapper} ref={chatContainer}>
      {expenses.map((exp) => (
        <ExpenseItem expense={exp} key={exp.spending_id} />
      ))}
      <div ref={containerEnd}></div>
      <GlobalLoader loading={fetching} />
    </div>
  );
};

export default ExpenseChat;
