import { useEffect, useState } from "react";
import { Link, Stack } from "expo-router";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TableTransactions from "../../components/TableTransactions";

export default function Home() {
  const [user, setUser] = useState(null); // State untuk data pengguna
  const [transactions, setTransactions] = useState([]); // State untuk riwayat transaksi
  const [loading, setLoading] = useState(true); // State untuk status loading

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Ambil token dari AsyncStorage jika diperlukan
        const token = await AsyncStorage.getItem("token");

        const res = await axios.get("http://192.168.30.57:8080/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update state dengan data pengguna
        setUser({
          fullname: res.data.fullName,
          typeofaccount: "Personal Account",
          accountnumber: res.data.id,
          balance: res.data.balance,
        });

        // Set contoh transaksi (opsional)
        setTransactions([
          {
            id: 1,
            date: "08 December 2024",
            amount: "75.000",
            name: "Indoapril",
            type: "Topup",
            debit: false,
          },
          {
            id: 2,
            date: "06 December 2024",
            amount: "80.000",
            name: "Si Fulan",
            type: "Transfer",
            debit: true,
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#19918F" />
      </View>
    );
  }

  return (
    <ScrollView containerStyle={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image
            source={require("../../assets/avatar.png")}
            style={{ width: 50, height: 50 }}
          />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {user.fullname}
            </Text>
            <Text style={{ fontSize: 18 }}>{user.typeofaccount}</Text>
          </View>
        </View>
        <Image source={require("../../assets/suntoggle.png")} />
      </View>
      <View style={{ backgroundColor: "#FAFBFD", paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 25,
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "70%" }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>
              Good Morning, {user.fullname.split(" ")[0]}
            </Text>
            <Text style={{ fontSize: 18 }}>
              Check all your incoming and outgoing transactions here
            </Text>
          </View>
          <Image
            source={require("../../assets/sun.png")}
            style={{ width: 81, height: 77 }}
          />
        </View>

        <View style={styles.accountnumber}>
          <Text style={{ color: "#fff", fontSize: 18 }}>Account No.</Text>
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            {user.accountnumber}
          </Text>
        </View>

        <View style={styles.balancebox}>
          <View>
            <Text style={{ fontSize: 20 }}>Balance</Text>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              Rp {user.balance.toLocaleString("id-ID")}
            </Text>
          </View>
          <View>
            <View style={{ gap: 20 }}>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#19918F",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome6 size={18} name="add" color={"#fff"} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#19918F",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome size={18} name="send" color={"#fff"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* <ScrollView
          style={{
            flex: 1,
            backgroundColor: "#fff",
            marginTop: 40,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              padding: 20,
              borderBottomColor: "#b3b3b3",
              borderBottomWidth: 0.5,
            }}
          >
            Transaction History
          </Text>
          {transactions.map((transaction) => (
            <View
              key={transaction.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                paddingVertical: 15,
              }}
            >
              <View>
                <Text style={{ fontSize: 18 }}>{transaction.name}</Text>
                <Text style={{ fontSize: 16 }}>{transaction.type}</Text>
                <Text style={{ fontSize: 14, color: "#b3b3b3" }}>
                  {transaction.date}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  color: transaction.debit ? "red" : "green",
                }}
              >
                {transaction.debit ? "-" : "+"} Rp{" "}
                {parseInt(transaction.amount).toLocaleString("id-ID")}
              </Text>
            </View>
          ))}
        </ScrollView> */}
        <TableTransactions />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  balancebox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  accountnumber: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#19918F",
    marginTop: 30,
    marginBottom: 40,
    borderRadius: 10,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 12,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
