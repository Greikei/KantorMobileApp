// app/archive.js
import { useState } from "react";
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
import { getArchivedRates } from "../server/database";

export default function Archive() {
  const [date, setDate] = useState("");
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return Alert.alert("Błąd", "Wpisz datę w formacie RRRR-MM-DD");
    }

    setLoading(true);
    setRates([]);
    try {
      const data = await getArchivedRates(date);
      setRates(data);
    } catch (e) {
      Alert.alert("Info", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Wprowadź datę:</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="RRRR-MM-DD"
          value={date}
          onChangeText={setDate}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.btn} onPress={handleSearch}>
          <Text style={{ color: "white", fontWeight: "bold" }}>SZUKAJ</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#3498db" />}

      <FlatList
        data={rates}
        keyExtractor={(item) => item.code}
        ListEmptyComponent={
          !loading && (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Brak danych do wyświetlenia
            </Text>
          )
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.code}>{item.code}</Text>
            <Text style={styles.val}>{item.mid.toFixed(4)} PLN</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: { marginBottom: 5, color: "#555" },
  searchRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  btn: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 5,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 8,
  },
  code: { fontWeight: "bold", fontSize: 18 },
  val: { fontSize: 18, color: "#555" },
});
