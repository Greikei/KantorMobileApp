# DOKUMENTACJA PROJEKTOWA

**Przedmiot:** Zagadnienia sieciowe w systemach mobilnych

**Temat projektu:** System mobilny kantoru wymiany walut

## 1. Informacje ogólne

**Nazwa projektu** - Kantor Mobile App

**Autorzy projektu** - Miłosz Maniuk, Maciej Mowel

**Kierunek studiów** - Informatyka Niestacjonarne

**Rok / Semestr** - 4 Rok / 7 Semestr

**Prowadzący** - Marcin Kacprowicz

**Data oddania**

## 2. Opis projektu

### 2.1. Cel projektu

Celem projektu jest stworzenie mobilnej aplikacji kantoru walutowego, umożliwiającej użytkownikom bezpieczną i intuicyjną wymianę walut oraz zarządzanie własnym portfelem finansowym w czasie rzeczywistym.

Aplikacja pozwala na rejestrację i logowanie użytkowników, prezentuje aktualne kursy walut pobierane z zewnętrznego API Narodowego Banku Polskiego oraz umożliwia wykonywanie transakcji kupna i sprzedaży wybranych walut obcych względem waluty PLN. System automatycznie przelicza wartości transakcji na podstawie bieżących kursów oraz weryfikuje dostępność środków użytkownika.

Użytkownik ma stały dostęp do informacji o stanie swojego portfela, w którym przechowywane są środki w różnych walutach, a także do szczegółowej historii wykonanych operacji finansowych zawierającej datę, typ transakcji, kurs oraz kwoty wymiany.

Wartość użytkowa systemu polega na połączeniu funkcji informacyjnych i transakcyjnych w jednej mobilnej aplikacji, która dostarcza aktualnych danych kursowych oraz umożliwia wygodne i przejrzyste zarządzanie środkami finansowymi, wspierając użytkownika w podejmowaniu świadomych decyzji walutowych.

---

### 2.2. Zakres projektu

Projekt aplikacji mobilnego kantoru walutowego obejmuje zestaw współpracujących modułów, które tworzą spójny system umożliwiający użytkownikom wymianę walut, zarządzanie portfelem finansowym oraz dostęp do aktualnych danych kursowych w czasie rzeczywistym.

---

### 1. Moduł aplikacji mobilnej (Frontend) – React Native (Expo)

Moduł aplikacji mobilnej stanowi główny interfejs użytkownika, umożliwiający interakcję z systemem kantoru.

Do jego kluczowych funkcji należą:

- rejestracja oraz logowanie użytkowników,

- prezentacja aktualnych kursów walut pobieranych z API Narodowego Banku Polskiego,

- realizacja operacji kupna i sprzedaży walut obcych względem waluty PLN,

- automatyczne przeliczanie wartości transakcji,

- wyświetlanie aktualnego stanu portfela użytkownika,

- prezentacja historii wykonanych transakcji,

- obsługa nawigacji pomiędzy widokami aplikacji.

Aplikacja mobilna komunikuje się z warstwą serwerową za pomocą REST API, wykorzystując format danych JSON.

**Technologie:** React Native (Expo), Expo Router, AsyncStorage, Fetch API.

---

### 2. Moduł serwera aplikacji (Backend) – Node.js + Express

Moduł serwera aplikacji odpowiada za realizację logiki biznesowej systemu oraz pośredniczy w komunikacji pomiędzy aplikacją mobilną a bazą danych.

Zakres funkcjonalny modułu obejmuje:

- obsługę rejestracji i logowania użytkowników,

- walidację danych wejściowych oraz kontrolę poprawności operacji finansowych,

- realizację transakcji kupna i sprzedaży walut z zachowaniem spójności danych,

- obsługę zapytań dotyczących sald użytkownika oraz historii transakcji,

- integrację z zewnętrznym API Narodowego Banku Polskiego w celu pobierania aktualnych kursów walut.

Backend zapewnia poprawność i bezpieczeństwo operacji finansowych oraz zwraca dane do aplikacji mobilnej w ujednoliconym formacie JSON.

Technologie: Node.js, Express.js, Prisma ORM.

---

### 3. Moduł bazy danych – SQLite (Prisma)

Moduł bazy danych odpowiada za trwałe przechowywanie informacji niezbędnych do prawidłowego działania systemu kantoru.

W bazie danych przechowywane są m.in.:

- dane użytkowników (konto, dane logowania),

- informacje o saldach walutowych użytkownika,

- historia transakcji kupna i sprzedaży walut,

- dane dotyczące kursów użytych w transakcjach.

Struktura bazy danych oparta jest na modelach: User, Balance oraz Transaction, które zapewniają integralność danych oraz jednoznaczne powiązanie użytkownika z jego portfelem i historią operacji.

Komunikacja z bazą danych realizowana jest za pomocą narzędzia Prisma ORM, które upraszcza obsługę zapytań oraz zarządzanie transakcjami.

---

### 4. Moduł transakcji finansowych

Moduł transakcji finansowych odpowiada za realizację operacji kupna i sprzedaży walut.

Do jego zadań należy:

- obliczanie wartości transakcji na podstawie aktualnego kursu waluty,

- sprawdzanie dostępności środków na koncie użytkownika,

- aktualizacja sald walutowych po wykonaniu transakcji,

- zapisywanie szczegółowych informacji o transakcji w historii użytkownika.

Wszystkie operacje finansowe wykonywane są w ramach transakcji atomowych, co eliminuje ryzyko niezgodności danych w przypadku błędów lub przerwania operacji.

---

### 5. Moduł integracji z API zewnętrznymi

Moduł integracji z API zewnętrznymi umożliwia pobieranie aktualnych kursów walut niezbędnych do realizacji transakcji walutowych.

System wykorzystuje:

API Narodowego Banku Polskiego (NBP) – do pobierania bieżących kursów walut.

Pobrane dane są przetwarzane i prezentowane użytkownikowi w aplikacji mobilnej, umożliwiając podejmowanie świadomych decyzji finansowych.

---

### 6. Moduł zarządzania portfelem użytkownika

Moduł zarządzania portfelem umożliwia użytkownikowi bieżący podgląd posiadanych środków w różnych walutach.

Funkcjonalność modułu obejmuje:

- prezentację sald wszystkich walut przypisanych do konta użytkownika,

- automatyczne aktualizowanie stanu portfela po wykonaniu transakcji,

- możliwość zasilania konta walutowego w walucie PLN.

System tworzy nowoczesną architekturę klient–serwer, w której:

- aplikacja mobilna zapewnia intuicyjny i przejrzysty interfejs użytkownika,

- warstwa serwerowa realizuje logikę biznesową oraz obsługę transakcji,

- baza danych SQLite gwarantuje trwałość, spójność i integralność danych finansowych.

---

## 3. Wymagania systemowe

### 3.1. Wymagania funkcjonalne

Tabela przedstawiająca wszystkie funkcje systemu.

### 3.2. Wymagania niefunkcjonalne

Opis wymagań dotyczących jakości systemu.

## 4. Diagramy UML

### 4.1. Diagram przypadków użycia

Wstaw diagram przedstawiający interakcje między użytkownikiem a systemem.

### 4.2. Diagram klas

Przedstaw strukturę logiczną systemu – główne klasy, atrybuty, relacje.

## 5. Projekt bazy danych

Model ERD (Entity-Relationship Diagram), opis tabel i relacji, klucze główne, obce, typy danych.

## 6. Architektura systemu

Opis wzajemnych powiązań między modułami aplikacji oraz schemat logiczny przepływu danych.

## 7. Plan realizacji projektu

## 8. Wnioski i możliwe rozszerzenia

Opis potencjalnych funkcjonalności dodatkowych lub usprawnień, które mogą zostać dodane po ukończeniu projektu.

## 9. Źródła

https://api.nbp.pl/

https://docs.expo.dev/

https://expressjs.com/

https://nodejs.org/api/all.html

https://www.sqlite.org/docs.html




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
   
