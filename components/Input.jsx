import { View, StyleSheet, Text, TextInput } from "react-native";

function Input({ text }) {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>{text}</Text>
      <TextInput style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    backgroundColor: "white",
  },
  placeholder: {
    color: "#B3B3B3",
  },
  input: {
    borderBottomColor: "#B3B3B3",
    borderBottomWidth: 0.5,
  },
});

export default Input;
