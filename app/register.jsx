import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import Button from "../components/Button";
import { Link, useRouter } from "expo-router";
import { z } from "zod";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Checkbox from "expo-checkbox";

const RegisterSchema = z
  .object({
    fullname: z.string().min(1, { message: "Fullname is required" }),
    username: z.string().min(1, { message: "Username is required" }),
    avatar_url: z.string().url({ message: "Avatar URL must be valid" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be 8 or more characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm Password must match Password" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords must match",
      });
    }
  });

export default function Register() {
  const [form, setForm] = useState({});
  const [errorMsg, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false); // State untuk checkbox
  const [isTermsViewed, setIsTermsViewed] = useState(false); // State untuk terms viewed
  const [modalVisible, setModalVisible] = useState(false); // State untuk modal

  const router = useRouter();

  const handleInputChange = (key, value) => {
    setErrors({ ...errorMsg, [key]: "" });
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      RegisterSchema.parse(form);

      if (!isChecked) {
        setErrors((prev) => ({
          ...prev,
          terms: "You must agree to the Terms and Conditions",
        }));
        return;
      }

      const response = await fetch(
        "https://walled-api.vercel.app/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname: form.fullname,
            username: form.username,
            email: form.email,
            password: form.password,
            avatar_url: form.avatar_url,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        router.push("/"); // Redirect to login or dashboard
      } else {
        const errorData = await response.json();
        setErrors((prev) => ({
          ...prev,
          server: errorData.message || "Something went wrong!",
        }));
      }
    } catch (err) {
      if (err.errors && Array.isArray(err.errors)) {
        const errors = {};
        err.errors.forEach((item) => {
          const key = item.path[0];
          errors[key] = item.message;
        });
        setErrors(errors);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="stretch"
      />

      <TextInput
        style={styles.input}
        placeholder="Fullname"
        placeholderTextColor="#aaa"
        onChangeText={(text) => handleInputChange("fullname", text)}
      />
      {errorMsg.fullname && (
        <Text style={styles.errorMsg}>{errorMsg.fullname}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#aaa"
        onChangeText={(text) => handleInputChange("username", text)}
      />
      {errorMsg.username && (
        <Text style={styles.errorMsg}>{errorMsg.username}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        onChangeText={(text) => handleInputChange("email", text)}
      />
      {errorMsg.email && <Text style={styles.errorMsg}>{errorMsg.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Avatar URL"
        placeholderTextColor="#aaa"
        onChangeText={(text) => handleInputChange("avatar_url", text)}
      />
      {errorMsg.avatar_url && (
        <Text style={styles.errorMsg}>{errorMsg.avatar_url}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
        onChangeText={(text) => handleInputChange("password", text)}
      />
      {errorMsg.password && (
        <Text style={styles.errorMsg}>{errorMsg.password}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
        onChangeText={(text) => handleInputChange("confirmPassword", text)}
      />
      {errorMsg.confirmPassword && (
        <Text style={styles.errorMsg}>{errorMsg.confirmPassword}</Text>
      )}

      <View style={styles.checkboxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setIsChecked}
          disabled={!isTermsViewed}
          color={isChecked ? "#19918F" : undefined}
        />
        <Text style={styles.checkboxText}>
          I have read and agree to the{" "}
          <Text style={styles.link} onPress={() => setModalVisible(true)}>
            Terms and Conditions
          </Text>
        </Text>
      </View>
      {errorMsg.terms && <Text style={styles.errorMsg}>{errorMsg.terms}</Text>}

      <Button handlePress={handleSubmit} text="Register" />

      {/* Modal untuk menampilkan syarat dan ketentuan */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {/* Header dengan Back button dan title */}
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setIsTermsViewed(true); // Tandai bahwa Terms telah dilihat
              }}
            >
              <MaterialIcons
                name="arrow-back-ios-new"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Terms and Conditions</Text>
          </View>

          {/* Deskripsi panjang yang dapat di-scroll */}
          <ScrollView style={styles.modalContent}>
            <Text style={styles.termsText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </ScrollView>
        </View>
      </Modal>

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Already have an account?{" "}
          <Link style={styles.link} href="/">
            Login here
          </Link>
        </Text>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 233,
    height: 57,
    marginBottom: 50,
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 16,
  },
  link: {
    color: "#19918F",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,
  },
  modalTitle: {
    flex: 1,
    textAlign: "left",
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginLeft: 15,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  termsText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
  },
  textContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginTop: 20,
  },
  text: {
    fontSize: 16,
  },
  errorMsg: {
    color: "red",
    width: "100%",
    fontSize: 14,
    marginBottom: 5,
  },
});
