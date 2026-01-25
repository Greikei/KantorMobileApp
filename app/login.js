import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { loginUser, registerUser } from '../services/Database';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const userId = await AsyncStorage.getItem('currentUserId');
    if (userId) {
      router.replace('/home');
    }
  };

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Błąd', 'Wypełnij wszystkie pola');
      return;
    }

    setLoading(true);
    try {
      if (isRegister) {
        const userId = await registerUser(email, password);
        if (userId) {
          await AsyncStorage.setItem('currentUserId', userId.toString());
          Alert.alert('Sukces', 'Zarejestrowano i zalogowano!');
          router.replace('/home');
        }
      } else {
        const user = await loginUser(email, password);
        if (user) {
          await AsyncStorage.setItem('currentUserId', user.id.toString());
          router.replace('/home');
        } else {
          Alert.alert('Błąd', 'Nieprawidłowy email lub hasło');
        }
      }
    } catch (error) {
      Alert.alert('Błąd', 'Użytkownik już istnieje lub błąd bazy');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kantor 💱</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Hasło" 
        value={password} 
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button 
        title={loading ? 'Ładowanie...' : (isRegister ? 'Zarejestruj się' : 'Zaloguj się')} 
        onPress={handleAuth} 
        disabled={loading}
      />
      <Button 
        title={isRegister ? 'Masz konto? Zaloguj się' : 'Nie masz konta? Zarejestruj się'} 
        onPress={() => setIsRegister(!isRegister)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 30, 
    gap: 15,
    backgroundColor: '#f8f9fa'
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    textAlign: 'center',
    marginBottom: 20
  },
  input: { 
    borderWidth: 1, 
    padding: 15, 
    borderRadius: 10, 
    borderColor: '#ddd',
    backgroundColor: 'white',
    fontSize: 16
  }
});
