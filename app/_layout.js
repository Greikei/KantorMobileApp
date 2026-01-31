import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { initDatabase } from "./api";

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    initDatabase().then(() => setReady(true));
  }, []);

  const handleLogout = async () => {
    Alert.alert("Wylogowanie", "Czy na pewno chcesz się wylogować?", [
      { text: "Anuluj", style: "cancel" },
      {
        text: "Wyloguj",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("currentUserId");
          router.replace("/login");
        },
      },
    ]);
  };

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Ładowanie Kantoru...</Text>
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          title: "Kantor 💱",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="home"
        options={{
          title: "Kantor",
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout}>
              <Text style={{ marginRight: 15, fontSize: 18 }}>Wyloguj</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="wallet"
        options={{
          title: "Twój Portfel",
        }}
      />

      <Stack.Screen
        name="history"
        options={{
          title: "Historia Transakcji",
        }}
      />
      <Stack.Screen
        name="archive"
        options={{
          title: "Archiwum Kursów",
        }}
      />
    </Stack>
  );
}
