

# Kantor Mobile App

##  O projekcie:

Prosta aplikacja wykorzystująca API Narodowego Banku Polskiego do szybkiej i intuicyjnej wymiany walut.

##  Technologie i narzędzia

- **React Native (Expo)** – Framework do budowy natywnych aplikacji mobilnych
- **Expo Router / React Navigation** – Zarządzanie nawigacją.
- **Context API** – Funkcjonalność Reacta do zarządzania globalnym stanem aplikacji
- **Node.js + Express.js** – Środowisko uruchomieniowe i framework serwerowy.
- **Prisma ORM** – Narzędzie do mapowania obiektowo-relacyjnego i komunikacji z bazą.
- **SQLite** – Relacyjna baza danych do przechowywania kont i transakcji.

##  Instalacja:

1. Skopiuj repozytorium
   ```sh
   git clone https://github.com/Greikei/KantorMobileApp.git
   ```
2. Instalacja pakietów NPM
   ```sh
   npm install
   ```
3. Instalacja Expo
   ```sh
   npx expo install
   ```
 ##  Uruchomienie servera:
   
4.1 Przejście do folderu: Sever w terminalu 
   ```sh
   cd server
   ```
4.2 Inicjacja servera Node 
   ```sh
   node server.js
   ```
   ##  Uruchomienie clienta:
5.1 Uruchomienie Expo
   ```sh
   npx expo start
   ```
5.2 Uruchomienie aplikacji Webowo lub na telefonie
 
   Web:
 ```sh
   Z gui EXPO wybieramy web wciskając litere W na klawiaturze
   ```
   Emulator:
   ```sh
Z gui EXPO wybieramy android wciskając literę A na klawiaturze
   ```
   Telefon:
   ```sh
   Skanujemy kod QR z terminala
   ```

##  Funkcjonalność

- Autoryzacja użytkowników – rejestracja nowych kont oraz bezpieczne logowanie do systemu.
- Pobieranie kursów walut live – integracja z API NBP w celu wyświetlania aktualnych cen kupna i sprzedaży.
- Realizacja transakcji – moduł kupna i sprzedaży walut obcych względem złotówki (PLN).
- Zarządzanie portfelem – podgląd aktualnego stanu posiadanych środków w różnych walutach.
- Historia transakcji – pełny wgląd w listę archiwalnych operacji finansowych (data, kurs, kwota).


##  Autorzy

- Maciej Mowel

```sh
42935
```

- Miłosz Maniuk

```sh
44687
```

<p align="right">(<a href="#readme-top">Powrót</a>)</p>

