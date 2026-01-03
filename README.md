# DOKUMENTACJA PROJEKTOWA

Przedmiot: Zagadnienia sieciowe w systemach mobilnych 

Część 1 – Projekt koncepcyjny 

Temat projektu: System mobilny kantoru wymiany walut 

# 1. Informacje ogólne 

Nazwa projektu 

 System mobilny kantor

Autorzy projektu 

 Miłosz Maniuk
 Maciej Mowel

Kierunek studiów 

 Informatyka NST

Rok / Semestr 

 4 / 1

Prowadzący 

 Marcin Kacprowicz

Data oddania 

 

# 2. Opis projektu 

2.1. Cel projektu 

Celem projektu jest stworzenie mobilnej aplikacji MoneyExchange, która wspiera użytkownika w wymianie walut poprzez dostarczanie w czasie rzeczywistym informacji o kursach walut, stanie salda, oraz portfela walut

 

Aplikacja automatycznie pobiera na bieżąco kursy walut z NBP.  Po wybraniu zakładki Portfel system pokazuje nam aktualnie posiadane waluty oraz ich ilosci.

 

Użytkownik może sprzedawac lub kupowan wybrane waluty i trzymać je w tak zwanym portfelu internetowym.

 

Dodatkowo system umożliwia śledzenie zmian kursów i na podstawie zmian dokonywać inwestycji. 

 

Wartość użytkowa systemu polega na połączeniu funkcji informacyjnych, finansowych i praktycznych w jednym narzędziu, które dostarcza spersonalizowane dane, wspierając użytkownika w planowaniu i bezpiecznym zakupie walut z różnych zakątków świata. 

2.2. Zakres projektu 

2.2. Zakres projektu – opis modułów systemu oraz ich roli 

 

Projekt Personal Data Turist obejmuje zestaw modułów tworzących spójny system, którego celem jest dostarczanie użytkownikowi informacji turystycznych, pogodowych, ekonomicznych i środowiskowych w czasie rzeczywistym. 

 

⸻ 

 

1. Moduł aplikacji mobilnej (Frontend) – React Native (Expo) 

•	Główna część interfejsu użytkownika umożliwiająca interakcję z systemem. 

•	Realizuje kluczowe funkcje: 

•	logowanie i rejestracja użytkownika, 

•	pobieranie i wyświetlanie aktualnych kursów, 

•	prezentacja portfela z posiadanymi walutami, 

•	możliwość wpłaty PLN, 

•	Komunikacja z backendem odbywa się przez REST API w formacie JSON. 

•	Technologia: React Native (Expo), z wykorzystaniem bibliotek takich jak react-navigation, axios, API. 

 

⸻ 

 

2. Moduł serwera aplikacji (Backend) – Node.js + Express 

•	Odpowiada za logikę biznesową i pośredniczy między aplikacją mobilną a bazą danych oraz zewnętrznymi API. 

•	Realizuje funkcje: 

•	autoryzacja i uwierzytelnianie użytkowników (JWT), 

•	pobieranie i przetwarzanie danych z zewnętrznych API: 

•	NBP API – kursy walut,  

•	Odpowiada za wysyłanie danych w ujednoliconym formacie JSON do aplikacji mobilnej. 

•	Zapewnia warstwę bezpieczeństwa oraz kontrolę dostępu do danych użytkownika. 

 

⸻ 

 

3. Moduł bazy danych – MySQL 

•	Przechowuje dane trwałe aplikacji, takie jak: 

•	informacje o użytkownikach, 

•	zapisane kursy, 

•	portfel z posiadanymi walutami, 

•	ilość pieniedzy na koncie. 

•	Struktura bazy danych obejmuje tabele m.in.: 

Users, Kursy, Portfel. 

•	Komunikacja z backendem realizowana poprzez natywne zapytania SQL. 

 

⸻ 

 

 

6. Moduł integracji z API zewnętrznymi 

•	Zapewnia komunikację z usługami open-source i publicznymi API: 
 
•	NBP API – kursy walut, 

•	Dane są okresowo odświeżane i przechowywane w pamięci podręcznej serwera w celu optymalizacji wydajności. 

 

System w całości tworzy nowoczesną architekturę klient–serwer, w której: 

•	warstwa mobilna zapewnia wygodny interfejs i doświadczenie użytkownika, 

•	warstwa serwerowa przetwarza dane i komunikuje się z API, 

•	baza danych MySQL gwarantuje trwałość i integralność informacji. 

 

# 3. Wymagania systemowe 

3.1. Wymagania funkcjonalne 

Tabela przedstawiająca wszystkie funkcje systemu: 

ID 

Nazwa funkcji 

Opis działania 

Priorytet 

F1 

Rejestracja użytkownika 

Użytkownik może utworzyć konto 

Wysoki 

3.2. Wymagania niefunkcjonalne 

Opis wymagań dotyczących jakości systemu: 

ID 

Nazwa 

Opis 

Kategoria 

N1 

Wydajność 

Czas odpowiedzi systemu ≤ 2 s 

Wydajność 

4. Diagramy UML 

4.1. Diagram przypadków użycia 

Wstaw diagram przedstawiający interakcje między użytkownikiem a systemem. 

4.2. Diagram klas 

Przedstaw strukturę logiczną systemu – główne klasy, atrybuty, relacje. 

# 5. Projekt bazy danych 

Model ERD (Entity-Relationship Diagram), opis tabel i relacji, klucze główne, obce, typy danych. 

# 6. Architektura systemu 

Opis wzajemnych powiązań między modułami aplikacji oraz schemat logiczny przepływu danych. 

# 7. Plan realizacji projektu 

Etap 

Opis 

Termin 

Osoba odpowiedzialna 

1 

Analiza wymagań 

 

 

# 8. Wnioski i możliwe rozszerzenia 

Opis potencjalnych funkcjonalności dodatkowych lub usprawnień, które mogą zostać dodane po ukończeniu projektu. 

# 9. Źródła 

https://docs.expo.dev/
https://expressjs.com/
https://api.nbp.pl/
https://nodejs.org/api/all.html
//dodać baze danych
