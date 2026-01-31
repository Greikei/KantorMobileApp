import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { loginUser, registerUser } from "./api";

export default function Login() {
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleAuth = async () => {
    if (!login || !password) {
      return Alert.alert("Błąd", "Podaj login i hasło");
    }

    try {
      if (isRegister) {
        const id = await registerUser(login, password);
        await AsyncStorage.setItem("currentUserId", id.toString());
        Alert.alert("Sukces", "Konto zostało utworzone");
        router.replace("/home");
      } else {
        const user = await loginUser(login, password);
        if (user) {
          await AsyncStorage.setItem("currentUserId", user.id.toString());
          router.replace("/home");
        } else {
          Alert.alert("Błąd", "Niepoprawny login lub hasło");
        }
      }
    } catch (e) {
      Alert.alert("Błąd", e.message || "Błąd serwera");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kantor 💱</Text>

      <TextInput
        style={styles.input}
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Hasło"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title={isRegister ? "Zarejestruj się" : "Zaloguj się"}
        onPress={handleAuth}
      />

      <Button
        title={isRegister ? "Mam już konto" : "Załóż konto"}
        onPress={() => setIsRegister(!isRegister)}
        color="#888"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    gap: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    backgroundColor: "white",
  },
});
