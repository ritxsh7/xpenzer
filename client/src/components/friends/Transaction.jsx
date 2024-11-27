import { useState } from "react";
import { homeStyles } from "../home/styles";
import { dateFormat } from "../../utils/date";
import styles from "./styles";
import friendsApi from "../../api/modules/friends";
import { toast } from "react-toastify";
import { updateBalance } from "../../store/functions/data";
import { useDispatch } from "react-redux";

const Transaction = ({ item, setSettling }) => {
  /* Transaction comp here */

  //stores
  const dispatch = useDispatch();

  //states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSettleTransaction = async () => {
    try {
      setLoading(true);
      setSettling((prev) => !prev);
      const response = await friendsApi.settleTransaction(
        item.contri_user,
        item.contri_amount,
        item.contri_id
      );
      console.log(response);
      dispatch(
        updateBalance({
          id: item.contri_user,
          amount: response.data.updateBalance[0],
        })
      );
      setSuccess(true);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.transactions.wrapper}>
      <div className={`${homeStyles.spendingItemList.container} p-2`}>
        <div className={homeStyles.spendingItemList.left}>
          <p className={styles.transactions.description}>{item.description}</p>
          <p className={styles.transactions.date}>
            {new Date(item.spending_date).toLocaleDateString(
              "en-IN",
              dateFormat
            )}
          </p>
        </div>
        <div className={homeStyles.spendingItemList.right(item.byFriend)}>
          {item.byFriend ? "+" : "-"}₹{item.contri_amount}
          {item.byFriend &&
            (item.settled || success ? (
              <p className={styles.transactions.settled}>Received</p>
            ) : (
              <p
                className={styles.transactions.settle(loading)}
                onClick={onSettleTransaction}
              >
                {loading ? "Updating..." : "Settle"}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
