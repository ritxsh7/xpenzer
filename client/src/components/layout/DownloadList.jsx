import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../../assets/logo.png";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    lineHeight: 1.5,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 30,
  },
  headerText: {
    fontSize: 18,
    textAlign: "center",
    flex: 1,
    marginLeft: -50,
  },
  totalAmount: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    color: "#FF5733",
    fontWeight: "bold",
  },
  transactionList: {
    marginVertical: 10,
  },
  transactionItem: {
    display: "flex",
    flexDirection: "column",
    borderBottom: "1px solid #ccc",
    paddingVertical: 10,
  },
  fieldRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  fieldLabel: {
    fontWeight: "bold",
    marginRight: 5,
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
  },
});

const DownloadList = ({ transactions }) => {
  const totalAmount = transactions
    .filter((transaction) => !transaction.settled)
    .reduce(
      (sum, transaction) => sum + parseFloat(transaction.contri_amount),
      0
    );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerContainer}>
          <Image style={styles.logo} src={logo} />
          <Text style={styles.headerText}>Transactions</Text>
        </View>
        <Text style={styles.totalAmount}>
          Total amount to be paid: ₹ {totalAmount.toFixed(2)}
        </Text>
        <View style={styles.transactionList}>
          {transactions.map((transaction, index) => (
            <View key={index} style={styles.transactionItem}>
              <View style={styles.fieldRow}>
                <Text>
                  <Text style={styles.fieldLabel}>Description:</Text>{" "}
                  {transaction.description}
                </Text>
              </View>
              <View style={styles.fieldRow}>
                <Text>
                  <Text style={styles.fieldLabel}>Amount:</Text> ₹
                  {transaction.contri_amount}
                </Text>
                <Text>
                  <Text style={styles.fieldLabel}>Contributed By:</Text>{" "}
                  {transaction.contri_username}
                </Text>
              </View>
              <View style={styles.fieldRow}>
                <Text>
                  <Text style={styles.fieldLabel}>Date:</Text>{" "}
                  {new Date(transaction.spending_date).toLocaleDateString()}
                </Text>
                <Text>
                  <Text style={styles.fieldLabel}>Settled:</Text>{" "}
                  {transaction.settled ? "Yes" : "No"}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <Text style={styles.footer}>Generated with React-PDF</Text>
      </Page>
    </Document>
  );
};

export default DownloadList;
