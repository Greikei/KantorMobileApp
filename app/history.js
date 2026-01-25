
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { getTransactions } from '../services/Database';

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const userId = await AsyncStorage.getItem('currentUserId');
    if (userId) {
      const txs = await getTransactions(userId);
      setHistory(txs);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historia transakcji</Text>

      {history.length === 0 ? (
        <Text style={styles.empty}>Brak transakcji</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.rate}>Kurs: {item.rate.toFixed(4)}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.sell}>-{item.amountPLN.toFixed(2)} {item.fromCurrency}</Text>
                <Text style={styles.buy}>+{item.received.toFixed(2)} {item.toCurrency}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  empty: { textAlign: 'center', color: '#999', marginTop: 50 },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: 'white', marginBottom: 10, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  date: { color: '#666', fontSize: 12, marginBottom: 2 },
  rate: { fontSize: 12, color: '#999' },
  sell: { color: '#dc3545', fontWeight: 'bold' },
  buy: { color: '#28a745', fontWeight: 'bold', fontSize: 16 }
});