# Light Manager

Lokale Home-Assistant-Integration zur Steuerung von Lampen und Lichtgruppen über Zeit- und Sensorprogramme.

- Zeitprogramme mit festen Uhrzeiten, Sonnenaufgang oder Sonnenuntergang sowie Einmalaktionen für heute.
- Sensorprogramme für Öffnungskontakte, Bewegung und Helligkeit mit Status, Sperrgründen und Pause bis Mitternacht.
- Gemeinsame Schaltziele pro Programm, gruppiert nach Home-Assistant-Bereichen.
- Lichtwerte und passende Hue-Szenen, Messwerte, Lampenstatus und Sicherung.
- Deutsch und Englisch mit integrierter Anleitung im **?-Tab**.

## Installation und Update

Siehe [INSTALLATION.md](INSTALLATION.md) für HACS und manuelle Installation. Die vorhandene Integration bleibt beim Update eingerichtet.

## Einrichtung

1. Bei einer Erstinstallation unter **Einstellungen → Geräte & Dienste → Integration hinzufügen** den **Light Manager** auswählen.
2. Eine manuelle Dashboard-Karte mit dem folgenden YAML hinzufügen.
3. Über das Zahnrad Lampen und Sensoren auswählen. Die Lampen werden nach HA-Bereichen gruppiert.
4. Unter **Programme** ein Zeit- oder Sensorprogramm anlegen. Die gewählten Lampen und Bereiche gelten für alle Schaltaktionen des Programms.

```yaml
type: custom:light-manager-card
```

## GitHub-Release

Dieses Paket ist für `v9h45n47mh-lab/light-manager` vorbereitet. Bei einem anderen Repository die Felder `documentation`, `issue_tracker` und `codeowners` in `custom_components/light_manager/manifest.json` anpassen. Die entpackten Dateien ins Repository-Stammverzeichnis übernehmen und aus diesem Stand das Release mit Tag `v1.3.0` erstellen. HACS verwendet die Integrationsdateien aus dem getaggten Repository.

[Changelog](CHANGELOG.md) · [MIT-Lizenz](LICENSE)

## Gemeinsame Oberfläche

Diese Version liefert HA UI Kit 1.5.0 lokal mit. Navigation, Symbole, Farben, Schriften, Einstellungsbereiche, Bedienelemente und native Dialoge verwenden den gemeinsamen Baukasten. Weitere Installationen oder externe Laufzeitverbindungen sind dafür nicht erforderlich.

Programmgruppen, Programmzeilen und aufgeklappte Aktionen werden direkt vom HA UI Kit 1.5.0 erzeugt. Ihre Schrift, Abstände, Einrückungen und Bedienelemente werden ohne lokale CSS-Überschreibungen übernommen.

Ab 1.2.8 stammen auch Geräteauswahl, Wochentage, Saison, Zeitfenster, Farbregler, Aktionseditoren, Messwerte, Verlauf und Tagesansichten aus dem Baukasten. Die Karte enthält keine lokalen CSS-Regeln.

Die Zeitübersicht zeigt zusätzlich Lichtaktionen der nächsten 24 Stunden aus einem eingerichteten Wecker Manager (geprüfter Vertrag: 1.4.0). Das gemeinsame UI-Kit-Weckersymbol markiert diese rein lesenden Einträge, einschließlich der Sonnenaufgangsphase. Weckerlampen müssen dafür nicht zusätzlich im Light Manager ausgewählt werden. Der Wecker berechnet Tagestypen, Kalenderbedingungen und Ausführungszustände; Änderungen erfolgen dort. Ohne Wecker bleibt Light Manager eigenständig nutzbar.

Die Zeitübersicht zeigt Schaltbefehle in einem rollenden 24-Stunden-Fenster, mit Tageskürzel vor jeder Uhrzeit, ohne Tagesüberschriften oder Datumsanzeige. Nach Mitternacht folgen die Uhrzeiten chronologisch; Auslassen bezieht sich auf das jeweilige Termindatum.

Im Zeitprogramm überspringt der schmale **Skip**-Button mit UI-Kit-Symbol einen einzelnen Termin. Der benachbarte Uhr-Pfeil-Button verschiebt ihn einmalig innerhalb desselben Tages auf eine zukünftige Uhrzeit. Die reguläre Uhrzeit sowie andere Tage bleiben unverändert; Änderungen werden nach einem Neustart beibehalten. Wecker-Termine werden weiterhin ausschließlich im Wecker bearbeitet.
