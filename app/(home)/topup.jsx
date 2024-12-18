import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import Amount from "../../components/Amount";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Topup() {
  const [amount, setAmount] = useState(""); // State untuk jumlah top-up
  const [notes, setNotes] = useState(""); // State untuk catatan
  const [paymentMethod, setPaymentMethod] = useState(null); // State untuk metode pembayaran
  const router = useRouter(); // Inisialisasi router

  const handleTopup = async () => {
    if (!amount || !paymentMethod) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        Alert.alert("Error", "User is not authenticated.");
        return;
      }

      const response = await axios.post(
        "https://walled-api.vercel.app/transactions/topup",
        {
          amount: parseInt(amount), // Pastikan jumlah berupa angka
          description: notes || "Top-up balance",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Sertakan token
          },
        }
      );

      Alert.alert("Success", "Top-up successful!");
      console.log("Response:", response.data);

      // Redirect ke halaman Home
      router.push("/(home)");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      Alert.alert("Error", "Failed to process top-up. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Amount
        marginBottom={24}
        style={styles.component}
        onChangeText={(value) => setAmount(value)} // Handle perubahan jumlah
      />
      <Dropdown
        options={["BYOND Pay", "E-Wallet", "BSI Mobile"]}
        placeholder="Select Payment Method"
        onSelect={(option) => setPaymentMethod(option)} // Handle perubahan metode pembayaran
        style={styles.component}
      />
      <Input
        text={"Notes"}
        onChangeText={(value) => setNotes(value)} // Handle perubahan catatan
        style={styles.component}
      />
      <View style={styles.buttonContainer}>
        <Button text={"Top Up"} handlePress={handleTopup} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFBFD",
    paddingTop: 20,
  },
  component: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
    padding: 15,
  },
});
