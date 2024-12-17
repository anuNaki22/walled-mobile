import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import moment from "moment"; // To handle date formatting

const TableTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const response = await axios.get(
          "https://walled-api.vercel.app/transactions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTransactions(response.data.data); // Update based on the API response structure
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#19918F" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      {transactions.map((transaction) => (
        <View key={transaction.id} style={styles.transactionRow}>
          <View>
            <Text style={styles.transactionName}>
              {transaction.description}
            </Text>
            <Text style={styles.transactionType}>
              {transaction.transaction_type}
            </Text>
            <Text style={styles.transactionDate}>
              {moment(transaction.transaction_date).format(
                "DD MMM YYYY, HH:mm"
              )}
            </Text>
          </View>
          <Text
            style={[
              styles.transactionAmount,
              {
                color:
                  transaction.transaction_type === "top-up" ? "green" : "red",
              },
            ]}
          >
            {transaction.transaction_type === "top-up" ? "+" : "-"} Rp{" "}
            {parseFloat(transaction.amount).toLocaleString("id-ID")}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 40,
    borderRadius: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
    borderBottomColor: "#b3b3b3",
    borderBottomWidth: 0.5,
  },
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  transactionName: {
    fontSize: 18,
  },
  transactionType: {
    fontSize: 16,
  },
  transactionDate: {
    fontSize: 14,
    color: "#b3b3b3",
  },
  transactionAmount: {
    fontSize: 18,
  },
});

export default TableTransactions;
