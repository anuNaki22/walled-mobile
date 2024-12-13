import { TouchableOpacity, Text, StyleSheet } from "react-native";

function Button({ bgColor = "#19918F", text }) {
  return (
    <TouchableOpacity style={{ ...styles.button, backgroundColor: bgColor }}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}
export default Button;

const styles = StyleSheet.create({
  button: {
    // backgroundColor: "#19918F",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
