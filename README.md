# Light Manager

## Zentraler Urlaubsmodus · 1.5.0

Der Urlaubsmodus wird ausschließlich unter **Family Access → Einstellungen → Urlaubsmodus** bedient. Die eigenen Urlaubsmodus-Bereiche und Schalter entfallen aus Light Manager, Shutter Manager und Hausarbeiten. Die Option „Im Urlaub pausieren“ je Programm bleibt erhalten; Programme ohne diese Option laufen weiter. Hausarbeiten pausieren ohne Änderung ihres Wiederholungsrhythmus und laufen beim Ausschalten ab heute weiter.

Beim ersten Start wird ein bisher aktiver Urlaubsmodus einmalig zentral als aktiv übernommen. Vergangene Urlaubstage aus Hausarbeiten bleiben erhalten. Eine bewusste zentrale Änderung hat Vorrang vor später startenden Anwendungen. Bei vorübergehend fehlendem Family Access bleibt der zuletzt bestätigte Zustand erhalten.

**Update:** zuerst Family Access Manager 1.2.0, danach Light Manager 1.5.0, Shutter Manager 1.9.0 und Hausarbeiten 0.5.0 installieren. Anschließend Home Assistant neu starten und Browser/App vollständig neu laden. Der zentrale Schalter speichert sofort, unabhängig von noch ungespeicherten Rollenänderungen. Bedienen dürfen echte HA-Administratoren und Eigentümer.

Automationen können `family_access_manager.set_vacation` mit `enabled: true/false` verwenden. Die bisherigen Light-/Shutter-Dienste leiten an diesen Dienst weiter und behalten den ursprünglichen HA-Benutzerkontext: echte Administratoren oder vertrauenswürdige HA-Automationen dürfen schalten. Ein reines Anwendungs-Verwaltungsrecht berechtigt nicht zum globalen Umschalten. Alte lokale WebSocket-Schreibzugriffe und Sicherungswerte können den zentralen Modus nicht überschreiben.


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

Dieses Paket ist für `v9h45n47mh-lab/light-manager` vorbereitet. Bei einem anderen Repository die Felder `documentation`, `issue_tracker` und `codeowners` in `custom_components/light_manager/manifest.json` anpassen. Die entpackten Dateien ins Repository-Stammverzeichnis übernehmen und aus diesem Stand das Release mit Tag `v1.5.0` erstellen. HACS verwendet die Integrationsdateien aus dem getaggten Repository.

[Changelog](CHANGELOG.md) · [MIT-Lizenz](LICENSE)

## Gemeinsame Oberfläche

Diese Version liefert HA UI Kit 1.5.2 lokal mit. Navigation, Symbole, Farben, Schriften, Einstellungsbereiche, Bedienelemente und native Dialoge verwenden den gemeinsamen Baukasten. Weitere Installationen oder externe Laufzeitverbindungen sind dafür nicht erforderlich.

Programmgruppen, Programmzeilen und aufgeklappte Aktionen werden direkt vom HA UI Kit 1.5.2 erzeugt. Ihre Schrift, Abstände, Einrückungen und Bedienelemente werden ohne lokale CSS-Überschreibungen übernommen.

Ab 1.2.8 stammen auch Geräteauswahl, Wochentage, Saison, Zeitfenster, Farbregler, Aktionseditoren, Messwerte, Verlauf und Tagesansichten aus dem Baukasten. Die Karte enthält keine lokalen CSS-Regeln.

Die Zeitübersicht zeigt zusätzlich Lichtaktionen der nächsten 24 Stunden aus einem eingerichteten Wecker Manager (geprüfter Vertrag: 1.4.0). Das gemeinsame UI-Kit-Weckersymbol markiert diese rein lesenden Einträge, einschließlich der Sonnenaufgangsphase. Weckerlampen müssen dafür nicht zusätzlich im Light Manager ausgewählt werden. Der Wecker berechnet Tagestypen, Kalenderbedingungen und Ausführungszustände; Änderungen erfolgen dort. Ohne Wecker bleibt Light Manager eigenständig nutzbar.

Die Zeitübersicht zeigt Schaltbefehle in einem rollenden 24-Stunden-Fenster, mit Tageskürzel vor jeder Uhrzeit, ohne Tagesüberschriften oder Datumsanzeige. Nach Mitternacht folgen die Uhrzeiten chronologisch; Auslassen bezieht sich auf das jeweilige Termindatum.

Im Zeitprogramm überspringt der reine **Skip**-Icon-Button aus dem UI Kit (ohne sichtbaren Text) einen einzelnen Termin. Der benachbarte Uhr-Pfeil-Button verschiebt ihn einmalig innerhalb desselben Tages auf eine zukünftige Uhrzeit. Die reguläre Uhrzeit sowie andere Tage bleiben unverändert; Änderungen werden nach einem Neustart beibehalten. Wecker-Termine werden weiterhin ausschließlich im Wecker bearbeitet.

Skip und Verschieben verwenden die gemeinsame Inline-Aktionsgruppe aus HA UI Kit 1.5.2 und bleiben auch bei langen Namen und auf kleinen Mobilgeräten nebeneinander.

Ausgelassene Termine erscheinen hellgrau, ohne zusätzlichen Auslassen-Text. Das neue UI-Kit-Symbol mit Rückkehrpfeil und Uhr plant den Termin wieder ein.

Wecker-Tagestypen in der Zeitübersicht verwenden den im Wecker gepflegten Anzeigenamen statt des technischen Namens. Ältere Einträge ohne Anzeigenamen verwenden weiterhin ihren bisherigen Namen.


## Zentrale Rollenrechte

Rollenrechte: Programme ansehen sowie Programme und Einstellungen verwalten. Nicht freigegebene Aktionen und native HA-Geräte ohne passende Bedienberechtigung werden im Backend abgelehnt. Deutsche und englische Hilfe angepasst.

Berechtigungen werden jetzt in **Family Access → Anwendung → Rolle** verwaltet. Benutzer können mehrere Rollen erhalten; ihre Freigaben ergänzen sich. Vorhandene Anwendungsrechte werden einmalig in Rollen mit dem Zusatz „übernommen“ importiert und den bisherigen Benutzern zugeordnet. Dashboardfreigaben und die Aktivierung der Dashboardnavigation werden dadurch nicht verändert.

Zum Entziehen eines Rechts alle zugewiesenen Rollen einschließlich übernommener Rollen prüfen. Neue Benutzer erhalten nach der Übernahme keine automatischen Anwendungsrechte. Echte HA-Administratoren behalten Vollzugriff zur Wiederherstellung. Geräte-, Eigentümer- und externe Kontoberechtigungen gelten zusätzlich; eine Rolle erzeugt keine HA-Administratorrechte.

**Aktualisierung:** zuerst Family Access Manager 1.1.0 oder neuer, danach die beteiligten Anwendungen aktualisieren und Home Assistant neu starten. Solange Family Access nicht eingerichtet ist, bleibt die bisherige Rechtevergabe erhalten. Ist Family Access eingerichtet, aber nicht verfügbar oder zu alt, werden Anwendungsaktionen für normale Benutzer abgelehnt. Lokale Benutzer-/Personen-, Geräte- und Musikkontozuordnungen bleiben für Identität und Eigentum erhalten; Rechte werden zentral vergeben.
