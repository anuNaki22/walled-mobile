import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import { Link } from "expo-router";

export default function Register() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="stretch"
      />
      <TextInput
        style={styles.input}
        placeholder="Fullname"
        placeholderTextColor="#aaa"
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Avatar Url"
        placeholderTextColor="#aaa"
        keyboardType="url"
      />

      <Button text="Register" bgColor="#19918F" />

      {/* Wrapper untuk teks rata kiri */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Have account?{" "}
          <Link style={styles.link} href="/">
            Login here
          </Link>
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 233,
    height: 57,
    marginBottom: 100,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  textContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginTop: 20,
  },
  text: {
    fontSize: 16,
  },
  link: {
    color: "#19918F",
    // textDecorationLine: "underline",
  },
});
