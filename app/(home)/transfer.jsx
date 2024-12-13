import { View, Text } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";

function Transfer() {
  return (
    <View>
      <Input text="Amount" />
      <Input text="Notes" />
      <Button text="Transfer" />
    </View>
  );
}
export default Transfer;
