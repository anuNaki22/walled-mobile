import { View, StyleSheet, TextInput, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%",
    backgroundColor: "white",
  },
  input: {
    fontSize: 40,
  },
  money: {
    flexDirection: "row",
    borderBottomColor: "#b3b3b3",
    borderBottomWidth: 0.5,
  },
  idr: { fontSize: 16, marginRight: 12, marginTop: 12 },
});
export default function Amount({
  balance = 0,
  showBalance = false,
  marginTop = 0,
  marginBottom = 0,
}) {
  return (
    <View
      style={{
        ...styles.container,
        marginTop: marginTop,
        marginBottom: marginBottom,
      }}
    >
      <Text style={{ color: "#b3b3b3" }}>Amount</Text>
      <View style={styles.money}>
        <Text style={styles.idr}>IDR</Text>
        <TextInput
          style={styles.input}
          placeholder="100.000"
          keyboardType="number-pad"
        />
      </View>
      {showBalance && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text style={{ color: "#b3b3b3" }}>Balance </Text>
          <Text style={{ color: "#19918F" }}>IDR {balance}</Text>
        </View>
      )}
    </View>
  );
}
