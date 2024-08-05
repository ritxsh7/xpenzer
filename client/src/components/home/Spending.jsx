import React, { useEffect } from "react";
import { spendingsApi } from "../../api/modules/spendings";

const Spending = (spending) => {
  useEffect(() => {
    const loadSpending = async () => {
      try {
        const result = await spendingsApi.getById(spending.id);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    loadSpending();
  }, [spending.id]);

  return <div>Spending</div>;
};

export default Spending;
