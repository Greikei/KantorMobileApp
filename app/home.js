
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { addTransaction, getUserBalances, zasilKonto } from '../services/Database';

export default function Home() {
  const router = useRouter();
  const [rates, setRates] = useState([]);
  const [loadingRates, setLoadingRates] = useState(true);
  
  const [amount, setAmount] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('USD'); 
  const [balancePLN, setBalancePLN] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);

  
  useEffect(() => {
    loadUserData();
    fetchNBPRates();
  }, []);

  const loadUserData = async () => {
    const userId = await AsyncStorage.getItem('currentUserId');
    if (!userId) {
      router.replace('/login');
      return;
    }
    setCurrentUserId(userId);
    refreshBalance(userId);
  };

  const refreshBalance = async (userId) => {
    const balances = await getUserBalances(userId);
    setBalancePLN(balances.PLN || 0);
  };

 
  const fetchNBPRates = async () => {
    try {
      const response = await fetch('https://api.nbp.pl/api/exchangerates/tables/A/?format=json');
      const data = await response.json();
      
      
      const popularCodes = ['USD', 'EUR', 'GBP', 'CHF', 'CAD', 'NOK'];
      const formattedRates = data[0].rates
        .filter(r => popularCodes.includes(r.code))
        .map(r => ({
          code: r.code,
          mid: r.mid
        }));
        
      setRates(formattedRates);
      setLoadingRates(false);
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się pobrać kursów NBP');
      setLoadingRates(false);
    }
  };

  const handleExchange = async () => {
    const amt = parseFloat(amount);
    if (!amt || isNaN(amt)) {
      Alert.alert('Błąd', 'Wpisz poprawną kwotę');
      return;
    }

    if (amt > balancePLN) {
      Alert.alert('Błąd', 'Za mało PLN!');
      return;
    }
    
    
    const selectedRateObj = rates.find(r => r.code === targetCurrency);
    const rate = selectedRateObj ? selectedRateObj.mid : 0;

    if (!rate) {
      Alert.alert('Błąd', 'Brak kursu dla tej waluty');
      return;
    }

    try {
      await addTransaction(currentUserId, 'PLN', targetCurrency, amt, rate);
      
      const received = amt / rate;
      Alert.alert('✅ Sukces!', 
        `Wymieniono ${amt.toFixed(2)} PLN na ${received.toFixed(2)} ${targetCurrency}`
      );
      
      setAmount('');
      refreshBalance(currentUserId); 
    } catch (error) {
      Alert.alert('Błąd transakcji', error.message);
    }
  };

  const handleZasil = async () => {
    if(currentUserId) {
      await zasilKonto(currentUserId);
      refreshBalance(currentUserId);
      Alert.alert('✅', 'Zasilono +100 PLN!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.balanceLabel}>Twoje środki:</Text>
        <Text style={styles.balance}>💰 {balancePLN.toFixed(2)} PLN</Text>
      </View>
      

      <TouchableOpacity style={styles.zasilButton} onPress={handleZasil}>
        <Text style={styles.zasilText}>➕ Zasil (+100 PLN)</Text>
      </TouchableOpacity>


      <Text style={styles.section}>📈 Kursy NBP (Tabela A)</Text>
      {loadingRates ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList 
          data={rates} 
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.code}
          renderItem={({item}) => (
            <TouchableOpacity 
              style={[
                styles.rateRow, 
                targetCurrency === item.code && styles.selectedRate
              ]}
              onPress={() => setTargetCurrency(item.code)}
            >
              <Text style={[styles.rateCode, targetCurrency === item.code && styles.textWhite]}>{item.code}</Text>
              <Text style={[styles.rateValue, targetCurrency === item.code && styles.textWhite]}>{item.mid.toFixed(4)}</Text>
            </TouchableOpacity>
          )}
        />
      )}


      <Text style={styles.section}>💱 Kupuję {targetCurrency}</Text>
      <View style={styles.exchangeContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Kwota w PLN" 
          value={amount} 
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <TouchableOpacity 
          style={[
            styles.exchangeButton, 
            (!amount || parseFloat(amount) > balancePLN) && styles.disabledButton
          ]} 
          onPress={handleExchange}
          disabled={!amount || parseFloat(amount) > balancePLN}
        >
          <Text style={styles.exchangeText}>Wymień</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.buttons}>
        <Link href="/wallet" asChild>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>💳 Portfel</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/history" asChild>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>📋 Historia</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  header: { marginBottom: 15, alignItems: 'center' },
  balanceLabel: { fontSize: 14, color: '#666' },
  balance: { fontSize: 32, fontWeight: 'bold', color: '#28a745' },
  
  zasilButton: { backgroundColor: '#e9f7ef', padding: 10, borderRadius: 8, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#28a745' },
  zasilText: { color: '#28a745', fontWeight: 'bold' },
  
  section: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 10, marginTop: 10 },
  
  rateRow: { padding: 15, marginRight: 10, backgroundColor: 'white', borderRadius: 12, alignItems: 'center', minWidth: 80, borderWidth: 1, borderColor: '#eee' },
  selectedRate: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  rateCode: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  rateValue: { fontSize: 14, color: '#666' },
  textWhite: { color: 'white' },
  
  exchangeContainer: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, padding: 15, borderRadius: 12, borderColor: '#ddd', backgroundColor: 'white', fontSize: 18 },
  exchangeButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 12, justifyContent: 'center', paddingHorizontal: 20 },
  disabledButton: { backgroundColor: '#ccc' },
  exchangeText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  
  buttons: { flexDirection: 'row', gap: 15, marginTop: 'auto' },
  actionButton: { flex: 1, backgroundColor: '#343a40', padding: 18, borderRadius: 12, alignItems: 'center' },
  actionText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});