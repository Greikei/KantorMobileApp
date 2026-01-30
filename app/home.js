import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  addBalance,
  addTransaction,
  getRates,
  getUserBalances,
} from "../services/database";

export default function Home() {
  const router = useRouter();
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [txType, setTxType] = useState("BUY");
  const [balances, setBalances] = useState({ PLN: 0 });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    checkUser();
    fetchRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkUser = async () => {
    const uid = await AsyncStorage.getItem("currentUserId");
    if (!uid) return router.replace("/login");
    setUserId(uid);
    refresh(uid);
  };

  const refresh = async (uid) => {
    const b = await getUserBalances(uid);
    setBalances(b);
  };

  const fetchRates = async () => {
    try {
      const data = await getRates();
      setRates(data);
      setLoading(false);
    } catch (_e) {
      Alert.alert("Błąd", "Nie udało się pobrać kursów z serwera");
    }
  };

  const handleExchange = async () => {
    const val = parseFloat(amount);
    if (!val || val <= 0) return Alert.alert("Błąd", "Podaj kwotę");

    const rate = rates.find((r) => r.code === targetCurrency)?.mid;
    if (!rate) return Alert.alert("Błąd", "Brak kursu");

    try {
      await addTransaction(userId, txType, targetCurrency, val);
      Alert.alert("Sukces", "Transakcja udana!");
      setAmount("");
      refresh(userId);
    } catch (e) {
      Alert.alert("Błąd", e.message);
    }
  };

  const handleAddBalance = async () => {
    await addBalance(userId);
    refresh(userId);
    Alert.alert("Sukces", "+100 PLN");
  };

  const rate = rates.find((r) => r.code === targetCurrency)?.mid || 0;
  const result = amount
    ? txType === "BUY"
      ? parseFloat(amount) / rate
      : parseFloat(amount) * rate
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sub}>Twoje środki:</Text>
        <Text style={styles.bal}>{(balances.PLN || 0).toFixed(2)} PLN</Text>
        {targetCurrency !== "PLN" && (
          <Text style={styles.subBal}>
            {targetCurrency}: {(balances[targetCurrency] || 0).toFixed(2)}
          </Text>
        )}
      </View>

      <TouchableOpacity onPress={handleAddBalance} style={styles.topup}>
        <Text style={styles.topupT}>➕ Zasil konto</Text>
      </TouchableOpacity>

      <Text style={styles.head}>Kursy NBP</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          horizontal
          data={rates}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(r) => r.code}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setTargetCurrency(item.code)}
              style={[
                styles.rateBox,
                targetCurrency === item.code && styles.rateActive,
              ]}
            >
              <Text
                style={[
                  styles.code,
                  targetCurrency === item.code && styles.white,
                ]}
              >
                {item.code}
              </Text>
              <Text
                style={[
                  styles.val,
                  targetCurrency === item.code && styles.white,
                ]}
              >
                {item.mid.toFixed(4)}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Text style={styles.head}>Wymiana Walut</Text>
      <View style={styles.switch}>
        <TouchableOpacity
          onPress={() => setTxType("BUY")}
          style={[styles.switchBtn, txType === "BUY" && styles.activeBtn]}
        >
          <Text style={[styles.switchTxt, txType === "BUY" && styles.white]}>
            KUP {targetCurrency}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTxType("SELL")}
          style={[styles.switchBtn, txType === "SELL" && styles.activeBtn]}
        >
          <Text style={[styles.switchTxt, txType === "SELL" && styles.white]}>
            SPRZEDAJ {targetCurrency}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.calc}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>
            {txType === "BUY" ? "Płacę (PLN)" : `Sprzedaję (${targetCurrency})`}
          </Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0.00"
          />
        </View>
        <Text
          style={{ fontSize: 24, alignSelf: "center", marginHorizontal: 10 }}
        >
          ➡️
        </Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>
            {txType === "BUY"
              ? `Otrzymam (${targetCurrency})`
              : "Otrzymam (PLN)"}
          </Text>
          <Text style={styles.res}>{result.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={handleExchange} style={styles.action}>
        <Text style={styles.whiteBtn}>WYKONAJ</Text>
      </TouchableOpacity>

      <View style={styles.nav}>
        <Link href="/wallet" asChild>
          <TouchableOpacity style={styles.navBtn}>
            <Text style={styles.white}>Portfel</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/history" asChild>
          <TouchableOpacity style={styles.navBtn}>
            <Text style={styles.white}>Historia</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/archive" asChild>
          <TouchableOpacity style={styles.navBtn}>
            <Text style={styles.white}>Archiwum</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  header: { alignItems: "center", marginBottom: 10 },
  bal: { fontSize: 32, fontWeight: "bold", color: "#2ecc71" },
  subBal: { fontSize: 16, color: "#555" },
  topup: {
    alignSelf: "center",
    padding: 8,
    borderColor: "#2ecc71",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  topupT: { color: "#2ecc71", fontWeight: "bold" },
  head: { fontSize: 18, fontWeight: "bold", marginBottom: 10, marginTop: 10 },
  rateBox: {
    padding: 10,
    backgroundColor: "white",
    marginRight: 10,
    borderRadius: 8,
    alignItems: "center",
    width: 70,
  },
  rateActive: { backgroundColor: "#3498db" },
  code: { fontWeight: "bold", fontSize: 16 },
  val: { fontSize: 12 },
  white: { color: "white" },
  switch: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    borderRadius: 8,
    padding: 2,
    marginBottom: 15,
  },
  switchBtn: { flex: 1, padding: 10, alignItems: "center", borderRadius: 6 },
  activeBtn: { backgroundColor: "#3498db" },
  switchTxt: { fontWeight: "bold" },
  calc: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    padding: 5,
  },
  res: { fontSize: 20, fontWeight: "bold", marginTop: 5 },
  label: { fontSize: 12, color: "#888" },
  action: {
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  whiteBtn: { color: "white", fontWeight: "bold", fontSize: 16 },
  nav: { flexDirection: "row", gap: 10, marginTop: "auto" },
  navBtn: {
    flex: 1,
    backgroundColor: "#34495e",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});
