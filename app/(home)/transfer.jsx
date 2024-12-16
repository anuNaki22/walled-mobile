import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import Input from "../../components/Input";
import Amount from "../../components/Amount";
import Button from "../../components/Button";
export default function Transfer() {
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#19918F",
          paddingHorizontal: 20,
          paddingVertical: 8,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>To:</Text>
        <TextInput
          style={{ fontSize: 18 }}
          keyboardType="number-pad"
          placeholder="insert account number"
          placeholderTextColor={"#fff"}
          color={"#fff"}
        />
      </View>
      <View style={styles.container}>
        <View>
          <Amount showBalance={true} marginBottom={24} balance={"10.000.000"} />
          <Input text={"Notes"} />
        </View>
        <View style={styles.buttonContainer}>
          <Button text={"Transfer"} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 20,
    backgroundColor: "#FAFBFD",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
    padding: 15,
  },
});
