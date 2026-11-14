# Validierung – Light Manager 1.3.1

1.3.0: Keine lokalen CSS-Regeln; gesamte Karte verwendet ausschließlich UI_CSS aus dem gepinnten Baukasten. Direkter Vergleich der berechneten Schriften, Farben, Abstände, Einrückungen und Maße von Programmgruppen, Programmzeilen, gemeinsamen Bedienelementen und aufgeklappten Aktionen mit einer unveränderten HA-UI-Kit-1.5.0-Referenz in separatem ShadowRoot. Geprüft bei 1100/390/320 px, jeweils hell/dunkel und auf-/zugeklappt. Kopieren, Sortieren, Aktivieren, Bearbeiten, Klappzustände und Speicherfehler geprüft.

145 Python-Tests sowie Browserprüfungen bei 1100, 390 und 320 px. Geprüft werden Deutsch/Englisch, helle und dunkle HA-Themefarben, Originalsymbole aus dem HA UI Kit, Navigationsreihenfolge, einklappbare Einstellungen, mobile Programmsteuerung, Urlaubsmodus in den Einstellungen, Programmbearbeitung und Speicherung, Sensoranzeigenamen, native Dialoge, Escape, Fokus und Erhalt offener Eingaben. Die gemeinsame UI-Version 1.5.0 wird lokal mit Lizenz und Prüfsummen geliefert. Automationslogik und Admin-WebSocket-Berechtigungen bleiben im Backend erhalten. Kein Live-Test gegen eine Hue-Bridge.

0.5.1: Gemeinsame Bereichssortierung für Einstellungen und Programme, alphabetische Lampen innerhalb der Bereiche sowie Zeitfeld-Layout geprüft.
Die Testsuite umfasst Python- und Browserprüfungen. Die bisherigen Tests zur manuellen Szenenfreigabe wurden an die ausdrücklich geänderte automatische Verfügbarkeit angepasst. Geprüft: gemeinsame Namensregel für alle Zielentitäten, Szenenausführung ohne manuelle Zuordnung, Zeit-/Sensorvorrang, Gruppenziele, Rückkehr und Neustarts, Datenmigration samt Sicherung, feste Einmaldaten, keine vorzeitige Ausführung, kein erneuter Auftrag nach Neustart, keine Wiederholung am nächsten Tag und Ablehnung neuer vergangener/fremder Tageszeiten.

Browserprüfungen: ui-smoke.cjs, ui-colors-language.cjs, ui-release022.cjs, ui-release040.cjs. Neue Prüfung: keine Szenenfelder im Lampeneditor, automatischer Katalog in Farbe, Zieländerungen mit Rückkehr zu Standardwerten, neue Hue-Szenen ohne Einstellungen, Einmaldialog samt Speicherung und mobile Darstellung. Alte Browserprüfungen ui-release030/033 dokumentieren die inzwischen ersetzte manuelle Szenenbedienung und gehören nicht zur aktuellen Testsuite.

JSON, Python-/JavaScript-Syntax und Installations-ZIP geprüft. Home Assistant und Hardwarezugriffe sind simuliert; kein Live-Test mit einer Hue-Bridge.

0.5.0: Neue Szene während geöffnetem Editor ohne manuelle Einstellungen ergänzt; ungewählte gelöschte Szene entfernt; gewählte gelöschte Szene als nicht verfügbar erhalten. Name, Fokus und Szene bleiben beim Aktualisieren unverändert. Einmalseinträge aus Programme ausgeblendet, im Zeitprogramm bearbeitet und gelöscht; deaktivierter Eintrag ohne Backend-Planzeile weiterhin sichtbar. Browserprüfungen auf Desktop und bei 390 Pixel Breite.

Vor jedem Release den Hilfe-Tab (?) auf Deutsch und Englisch mit dem aktuellen Funktionsumfang und den Beschriftungen abgleichen.

1.3.0: Optionaler Wecker-Adapter mit 13 neuen Prüfungen für Berechtigungen, aktive/pausierte/erledigte Wecker, Phasenfreigabe durch den Originalplaner, lokale Datumsgrenzen, Geräte ohne Dimmung, wechselnde Revisionen und Ausfälle. GET ohne Wecker-Abfrage und Anzeige führen keine Gerätebefehle oder Speichervorgänge aus. Browser prüft chronologische Mischung, das kleine Weckersymbol ohne Bedienelemente, vergangene Termine, Ausfälle sowie Desktop/Mobil und beide Themes. Kein Live-Test gegen die private HA-Instanz.

1.3.0: HA UI Kit 1.5.0 lokal gepinnt; das 16-px-Weckersymbol wird im Browser direkt mit dem SVG-Export `icon('media-alarm')` verglichen. Desktop/Mobil und beide Themes bleiben Bestandteil der Prüfung.

1.3.0: Rollende Vorschau für exakt 24 Stunden Laufzeit (UTC-Grenzen), ohne Laufzeitmutation. Geprüft: Mitternacht, Wochentage/Saison, Urlaub, deaktivierte Aktionen, Sonnenzeiten, Einmalaktionen, Auslassungen pro Termindatum, beide Zeitumstellungen und Wecker-Sonnenaufgang innerhalb des Fensters bei Weckzeit außerhalb. Browser prüft die durchgehende Liste ohne Tageskopf, zeitlich korrekte Reihenfolge und Auslassen/Wiederherstellen für morgen.

1.3.0: Tageskürzel pro Termin in der HA-Zeitzone für reguläre und Wecker-Aktionen; Browserprüfung auf Deutsch und Englisch sowie über Mitternacht.

1.3.0: Einmalige Verschiebung vor/nach dem Originaltermin, Ablehnung vergangener Termine, Tagesgrenzen, Sonnenereignisse, Neustart, Skip und unveränderte Folgetage. UI-Kit-1.5.0-Symbole und kompakte Buttons; Desktop/Mobil und beide Themes.

1.3.1: Skip als reiner UI-Kit-Icon-Button ohne sichtbare Beschriftung; Tooltip, zugänglicher Name und gedrückter Zustand. Auslassen/Wiederherstellen, Desktop/Mobil und beide Themes geprüft.
