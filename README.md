# Kantor Mobile App

Mobilna aplikacja do symulacji wymiany walut w czasie rzeczywistym. Projekt wykorzystuje **React Native (Expo)** po stronie klienta oraz **Node.js** z bazą **SQLite** po stronie serwera. Aplikacja pobiera aktualne kursy walut bezpośrednio z API **Narodowego Banku Polskiego (NBP)**.

---

## Funkcjonalności

- **Autoryzacja:** Rejestracja i logowanie użytkowników.
- **Kursy Live:** Pobieranie aktualnych tabel kursowych z API NBP.
- **Transakcje:** Kupno i sprzedaż walut oraz ich przeliczanie w czasie rzeczywistym.
- **Portfel:** Podgląd salda dla PLN oraz posiadanych walut obcych (USD, EUR, GBP, CHF, CAD, NOK).
- **Historia:** Pełny rejestr operacji z datą, kursem i kwotą.
- **Archiwum:** Możliwość sprawdzenia kursów walut z dowolnej daty w przeszłości.
- **Doładowanie:** Symulacja zasilania konta PLN.

---

## Technologie

### Frontend (Mobile)

- **Framework:** React Native (Expo SDK)
- **Routing:** Expo Router (File-based routing)
- **Komunikacja:** Fetch API
- **Storage:** Async Storage

### Backend (Server)

- **Runtime:** Node.js + Express.js
- **Baza danych:** SQLite
- **ORM:** Prisma
- **API:** NBP Web API

---

## Instalacja i Uruchomienie

### Krok 1: Klonowanie repozytorium

```
git clone https://github.com/Greikei/KantorMobileApp.git

cd KantorMobileApp
```

### Krok 2: Instalacja zależności

```
npm install

cd server

npm install
```

### Krok 3: Konfiguracja Bazy Danych

```
npx prisma generate

npx prisma migrate dev
```

### Krok 3: Uruchomienia Serwera

```
node server.js
```

### Krok 4: Uruchomienie Aplikacji

```
cd ..

npx expo start
```

## Autorzy

```
Maciej Mowel - 42935
```

```
Miłosz Maniuk - 44687
```
