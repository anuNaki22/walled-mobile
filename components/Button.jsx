import { TouchableOpacity, Text, StyleSheet } from "react-native";

function Button({ bgColor = "#19918F", text, onPress }) {
  return (
    <TouchableOpacity
      style={{ ...styles.button, backgroundColor: bgColor }}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
