import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getTransactions } from "../services/database";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    (async () => {
      const uid = await AsyncStorage.getItem("currentUserId");
      if (uid) setHistory(await getTransactions(uid));
    })();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 50 }}>
            Brak historii
          </Text>
        }
        renderItem={({ item }) => {
          const isBuy = item.type === "BUY";
          return (
            <View style={styles.row}>
              <View>
                <Text style={[styles.type, isBuy ? styles.green : styles.red]}>
                  {isBuy ? "KUPNO" : "SPRZEDAŻ"}
                </Text>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.rate}>Kurs: {item.rate.toFixed(4)}</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                {isBuy ? (
                  <>
                    <Text style={styles.red}>
                      -{item.amountPLN.toFixed(2)} PLN
                    </Text>
                    <Text style={styles.green}>
                      +{item.amountForeign.toFixed(2)} {item.currency}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.red}>
                      -{item.amountForeign.toFixed(2)} {item.currency}
                    </Text>
                    <Text style={styles.green}>
                      +{item.amountPLN.toFixed(2)} PLN
                    </Text>
                  </>
                )}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10,
  },
  type: { fontWeight: "bold" },
  date: { fontSize: 12, color: "#888" },
  rate: { fontSize: 12, color: "#aaa" },
  green: { color: "#2ecc71", fontWeight: "bold" },
  red: { color: "#e74c3c", fontWeight: "bold" },
});
