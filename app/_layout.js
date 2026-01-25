import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { initDatabase } from '../services/Database';

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initDatabase().then(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>🚀 Ładowanie Kantor App...</Text>
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: 'Kantor 💱' }} />
      <Stack.Screen name="home" options={{ title: 'Kantor' }} />
      <Stack.Screen name="wallet" options={{ title: 'Portfel 📋' }} />
      <Stack.Screen name="history" options={{ title: 'Historia 📋' }} />
    </Stack>
  );
}
