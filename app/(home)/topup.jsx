import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Input from "../../components/Input";
import Amount from "../../components/Amount";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";

export default function Topup() {
  const [paymentMethod, setPaymentMethod] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.spacer} />
      <Amount marginBottom={24} style={styles.component} />
      <Dropdown
        options={["BYOND Pay", "E-Wallet", "BSI Mobile"]}
        placeholder="Select Payment Method"
        onSelect={(option) => setPaymentMethod(option)}
        style={styles.component}
      />
      <Input text={"Notes"} style={styles.component} />
      <View style={styles.buttonContainer}>
        <Button text={"Top Up"} />
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
  spacer: {
    // flex: 0.1, // Optional: Space at the top
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
