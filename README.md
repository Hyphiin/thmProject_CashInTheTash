# CashInTheTash

Projekt für MIB33 Web-Frameworks
CashInTheTash

Installation:
- bei Terminal in den cashinthetash Ordner wechseln und "npm install" eingeben
- um Projekt zu starten "npm run dev" eingeben

Projektthema: Finanzplaner
- Einnahmen und Ausgaben planen
- Jahres- und Monatsüberblick
- Einzel- oder Gruppennutzung
- Kategorisierung der Ausgaben

Must-have Features: 
- Login mit Registrierungsystem -> Vorraussetzung für User um Listen zu erstellen, Primär Google Login -> Hoch **(erledigt)**
- Finanzplan erstellen können -> Sobald User Finanzplan erstellt wird Eintrag in Datenbank hinzugefügt und es besteht ab sofort die Möglichkeit        Einträge diesem Finanzplan hinzuzufügen -> Hoch **(erledigt)**
- Mehrere Tabs -> User kann mehrere Finanzpläne erstellen -> Mittel **(erledigt)**
- Finanzen als Liste -> Finanzplan als Liste ausgeben, simple Strichliste, wo Ausgaben und Einnahmen untereinander aufgeführt werden sollen -> Hoch **(erledigt)**
- Finanzen als Diagramm darstellen -> Datenbankdaten auslesen und visuell umsetzen, Tortendiagramm, Balkendiagramm etc. -> Mittel **(erledigt)**
- Finanzplan bearbeiten -> Einträge hinzufügen, löschen -> Hoch **(erledigt)**
- Responsivität -> Mobilefirst!, Desktop auch geplant -> Hoch **(erledigt)**
- Filterungen nach Monat/Jahr, Kategorie, etc -> Mittel **(erledigt)**

Nice-to-have Features: 
- Finanzen mit mehreren teilen -> mit mehreren Usern einen Finanzplan bearbeiten und sehen können
- Finanzplan bearbeiten -> Einträge bearbeiten **(erledigt)**
- Finanzplan als PDF ->  Finanzplan als PDF runterladen können
- andere Login Methoden -> ergänzend zum Google Login, z.B. normale Registrierung per Mail
- Deployment auf Hosting Server der Thm

Beispiel einzelner Eintrag:
- Titel
- Einnahme o. Ausgabe (in Eur)
- Kategorie
- wiederkehrende Einnahme/Ausgabe? -> wenn ja, Intervall?
- timestamp (wird automatisch gespeichert)
- UserID (wird automatisch gespeichert)

Beispiel Datenbank:
- Datenbank für User (automatisch generiert)
- Datenbank für Finanzpläne 
    - enthält einzelne Einträge -> diese enthalten oben genannte Spezifikationen