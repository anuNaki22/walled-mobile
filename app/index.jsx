import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TextInput, Image, Text } from "react-native";
import Button from "../components/Button";
import { Link, useRouter } from "expo-router";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
});

export default function App() {
  const [form, setForm] = useState({});
  const [errorMsg, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const router = useRouter();

  const handleInputChange = (key, value) => {
    setErrors({ ...errorMsg, [key]: "" });
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      LoginSchema.parse(form);

      const res = await axios.post(
        "http://192.168.30.57:8080/api/auth/login",
        form
      );

      if (res.status === 200) {
        await AsyncStorage.setItem("token", res.data.accessToken);
        console.log("Response:", res);
        router.push("/(home)");
      }
    } catch (err) {
      if (err.name === "ZodError") {
        const validationErrors = {};
        err.errors.forEach((item) => {
          validationErrors[item.path[0]] = item.message;
        });
        setErrors(validationErrors);
      } else if (err.response) {
        console.error("Server Error:", err.response.data);
        setServerError(err.response.data.message || "Login failed.");
      } else {
        console.error("Unexpected Error:", err);
        setServerError("An unexpected error occurred.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="stretch"
      />
      {errorMsg.email ? (
        <Text style={styles.errorMsg}>{errorMsg.email}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        onChangeText={(text) => handleInputChange("email", text)}
      />

      {errorMsg.password ? (
        <Text style={styles.errorMsg}>{errorMsg.password}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
        onChangeText={(text) => handleInputChange("password", text)}
      />

      {/* {serverError ? <Text style={styles.errorMsg}>{serverError}</Text> : null} */}

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {serverError ? (
          <Text style={{ color: "red" }}>{serverError}</Text>
        ) : null}
      </View>

      <Button handlePress={handleSubmit} text="Login" />

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Don’t have an account?{" "}
          <Link style={styles.link} href="/register">
            Register here
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
  },
  errorMsg: {
    color: "red",
    width: "100%",
  },
});
