import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getUserBalances } from "../server/database";

export default function Wallet() {
  const [balances, setBalances] = useState({});

  useEffect(() => {
    (async () => {
      const uid = await AsyncStorage.getItem("currentUserId");
      if (uid) setBalances(await getUserBalances(uid));
    })();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(balances)}
        keyExtractor={(i) => i}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cur}>{item}</Text>
            <Text style={styles.amt}>{balances[item].toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10,
  },
  cur: { fontSize: 18, fontWeight: "bold" },
  amt: { fontSize: 18 },
});
