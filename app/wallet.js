
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getUserBalances } from '../services/Database';

export default function Wallet() {
  const [balances, setBalances] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWallet();
  }, []);

  const loadWallet = async () => {
    try {
      const userId = await AsyncStorage.getItem('currentUserId');
      if (!userId) return; 
      
      const userBalances = await getUserBalances(userId);
      
      setBalances(userBalances); 
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const renderBalance = ({ item }) => {
    
    const currencyCode = item;
    const amount = balances[currencyCode];

    return (
      <View style={[styles.balanceRow, amount > 0 ? styles.activeRow : null]}>
        <Text style={styles.currencyCode}>{currencyCode}</Text>
        <Text style={styles.amount}>{amount.toFixed(2)}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Ładowanie portfela...</Text>
      </View>
    );
  }

  
  const dataList = Object.keys(balances);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💳 Twój Portfel</Text>
      
      <FlatList
        data={dataList}
        renderItem={renderBalance}
        keyExtractor={item => item}
        style={styles.list}
        ListEmptyComponent={<Text style={{textAlign:'center'}}>Portfel jest pusty</Text>}
      />

      <View style={styles.actions}>
        <Link href="/home" asChild>
           <TouchableOpacity style={styles.actionButton}>
             <Text style={styles.btnText}>➕ Wymiana walut</Text>
           </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa', gap: 20 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginTop: 20 },
  list: { flex: 1, marginTop: 10 },
  balanceRow: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 20, backgroundColor: 'white', borderRadius: 12, marginBottom: 12,
    borderLeftWidth: 5, borderLeftColor: '#ccc'
  },
  activeRow: { borderLeftColor: '#28a745' },
  currencyCode: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  amount: { fontSize: 20, fontWeight: '700', color: '#333' },
  actions: { marginTop: 10 },
  actionButton: { 
    backgroundColor: '#007AFF', padding: 18, borderRadius: 12, alignItems: 'center'
  },
  btnText: { color: 'white', fontSize: 16, fontWeight: '600' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});