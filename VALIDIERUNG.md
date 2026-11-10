# Validierung – Light Manager 1.2.1

1.2.1: 113 Python-Tests sowie Browserprüfungen bei 1100, 390 und 320 px. Geprüft werden Deutsch/Englisch, helle und dunkle HA-Themefarben, Originalsymbole aus dem HA UI Kit, Navigationsreihenfolge, einklappbare Einstellungen, mobile Programmsteuerung, Urlaubsfilter, Programmbearbeitung und Speicherung, Sensoranzeigenamen, native Dialoge, Escape, Fokus und Erhalt offener Eingaben. Die gemeinsame UI-Version 1.0.0 wird lokal mit Lizenz und Prüfsummen geliefert. Automationslogik und Admin-WebSocket-Berechtigungen bleiben im Backend erhalten. Kein Live-Test gegen eine Hue-Bridge.

0.5.1: Gemeinsame Bereichssortierung für Einstellungen und Programme, alphabetische Lampen innerhalb der Bereiche sowie Zeitfeld-Layout geprüft.
Die Testsuite umfasst Python- und Browserprüfungen. Die bisherigen Tests zur manuellen Szenenfreigabe wurden an die ausdrücklich geänderte automatische Verfügbarkeit angepasst. Geprüft: gemeinsame Namensregel für alle Zielentitäten, Szenenausführung ohne manuelle Zuordnung, Zeit-/Sensorvorrang, Gruppenziele, Rückkehr und Neustarts, Datenmigration samt Sicherung, feste Einmaldaten, keine vorzeitige Ausführung, kein erneuter Auftrag nach Neustart, keine Wiederholung am nächsten Tag und Ablehnung neuer vergangener/fremder Tageszeiten.

Browserprüfungen: ui-smoke.cjs, ui-colors-language.cjs, ui-release022.cjs, ui-release040.cjs. Neue Prüfung: keine Szenenfelder im Lampeneditor, automatischer Katalog in Farbe, Zieländerungen mit Rückkehr zu Standardwerten, neue Hue-Szenen ohne Einstellungen, Einmaldialog samt Speicherung und mobile Darstellung. Alte Browserprüfungen ui-release030/033 dokumentieren die inzwischen ersetzte manuelle Szenenbedienung und gehören nicht zur aktuellen Testsuite.

JSON, Python-/JavaScript-Syntax und Installations-ZIP geprüft. Home Assistant und Hardwarezugriffe sind simuliert; kein Live-Test mit einer Hue-Bridge.

0.5.0: Neue Szene während geöffnetem Editor ohne manuelle Einstellungen ergänzt; ungewählte gelöschte Szene entfernt; gewählte gelöschte Szene als nicht verfügbar erhalten. Name, Fokus und Szene bleiben beim Aktualisieren unverändert. Einmalseinträge aus Programme ausgeblendet, im Zeitprogramm bearbeitet und gelöscht; deaktivierter Eintrag ohne Backend-Planzeile weiterhin sichtbar. Browserprüfungen auf Desktop und bei 390 Pixel Breite.

Vor jedem Release den Hilfe-Tab (?) auf Deutsch und Englisch mit dem aktuellen Funktionsumfang und den Beschriftungen abgleichen.
