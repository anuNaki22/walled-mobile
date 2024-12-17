import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Input from "../../components/Input";
import Amount from "../../components/Amount";
import Button from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Transfer() {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const getBalance = async () => {
      try {
        const balance = await AsyncStorage.getItem("balance");
        if (balance) {
          setBalance(parseFloat(balance)); // Konversi ke float
        }
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    };

    getBalance();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>To:</Text>
        <TextInput
          style={styles.inputAccount}
          keyboardType="number-pad"
          placeholder="Insert account number"
          placeholderTextColor={"#fff"}
          value={accountNumber}
          onChangeText={(value) => setAccountNumber(value)}
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Amount
          showBalance={true}
          marginBottom={24}
          // balance={"10.000.000"}
          balance={balance ? balance.toLocaleString("id-ID") : "Loading..."}
          // balance={res.data.data.balance.toLocaleString("id-ID")}
          onChangeText={(value) => setAmount(value)}
        />
        <Input text={"Notes"} onChangeText={(value) => setNotes(value)} />
      </View>

      {/* Button */}
      <View style={styles.buttonContainer}>
        <Button
          text={"Transfer"}
          handlePress={() =>
            console.log(
              `Transferring IDR ${amount} to ${accountNumber} with notes: ${notes}`
            )
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFBFD",
  },
  header: {
    backgroundColor: "#19918F",
    paddingHorizontal: 20,
    paddingVertical: 8,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
  },
  inputAccount: {
    fontSize: 18,
    flex: 1,
    marginLeft: 10,
    padding: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#fff",
    color: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FAFBFD",
  },
});
