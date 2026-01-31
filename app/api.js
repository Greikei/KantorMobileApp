import Constants from "expo-constants";
import { Platform } from "react-native";

const debuggerHost = Constants.expoConfig?.hostUri?.split(":")[0];
const API_URL =
  Platform.OS === "web"
    ? "http://localhost:3000"
    : `http://${debuggerHost}:3000`;

export const initDatabase = async () => {
  console.log("🔗 API:", API_URL);
  return true;
};

export const registerUser = async (login, password) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data.id;
};

export const loginUser = async (login, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, password }),
  });
  if (!res.ok) return null;
  return await res.json();
};

export const getUserBalances = async (userId) => {
  try {
    const res = await fetch(`${API_URL}/balance/${userId}`);
    return await res.json();
  } catch (_e) {
    return { PLN: 0 };
  }
};

export const getTransactions = async (userId) => {
  try {
    const res = await fetch(`${API_URL}/transactions/${userId}`);
    return await res.json();
  } catch (_e) {
    return [];
  }
};

export const getRates = async () => {
  const res = await fetch(`${API_URL}/rates`);
  if (!res.ok) throw new Error("Błąd pobierania kursów");
  return await res.json();
};

export const getArchivedRates = async (date) => {
  const res = await fetch(`${API_URL}/rates/${date}`);
  if (!res.ok) throw new Error("Brak kursów dla tej daty");
  return await res.json();
};

export const addBalance = async (userId) => {
  await fetch(`${API_URL}/topup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
};

export const addTransaction = async (userId, type, currency, amountInput) => {
  const res = await fetch(`${API_URL}/transaction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, type, currency, amountInput }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Błąd");
  return true;
};
