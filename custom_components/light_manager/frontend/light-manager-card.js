import {UI_CSS, UI_VERSION, icon as uiIcon, button as uiButton, iconButton, navigation, section as uiSection, row as uiRow, toggle as uiToggle, filterButton, field as uiField, selectField, dialog as uiDialog, notice, versionInfo, bindUI} from './family-ui/1.0.0/family-ui.js';
/* Light Manager 1.2.0 — no external assets, dependencies or network services. */
const LM_VERSION = '1.2.0';
const lmClone = x => JSON.parse(JSON.stringify(x));
const lmEsc = x => String(x ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const lmId = () => globalThis.crypto?.randomUUID?.() || 'lm_' + Date.now().toString(36) + Math.random().toString(36).slice(2);
const LM_EN = {
  '+ Zusätzliche Aktion':'+ Additional action','Lampen und Bereiche für alle Schaltaktionen':'Lights and areas for all actions','Dieses Programm hat bisher unterschiedliche Schaltziele. Bitte gemeinsame Ziele für alle Aktionen auswählen.':'This program has different targets across actions. Select shared targets for all actions.','Name der Schaltaktion':'Action name','Schaltaktion':'Action','Einmalige Schaltung':'One-time switching','Auslöser':'Trigger','Bereich':'Area','Bereiche':'Areas','Zuerst Bereiche oder Lampen auswählen.':'Select areas or lights first.','Zeitprogramme':'Time programs','Sensorprogramme':'Sensor programs','Bis morgen aussetzen':'Pause until tomorrow','Heute wieder aktivieren':'Resume today','Für heute ausgesetzt':'Paused for today','Alle aufklappen':'Expand all','Alle zuklappen':'Collapse all','Außerhalb des Zeitfensters':'Outside the time window','Aktiv':'Active','Nicht aktiv':'Not active','Tag':'Day','Uhrzeit':'Time','Saison':'Season','Öffnung':'Opening','Außerhalb der Saison':'Outside the season','Im Urlaub ausgesetzt':'Paused during vacation','Schaltaktion deaktiviert':'Action disabled','Programm nach oben':'Move program up','Programm nach unten':'Move program down','Programm kopieren':'Copy program',' (Kopie)':' (copy)','Ganzer Bereich':'Entire area','Bereich nach oben':'Move area up','Bereich nach unten':'Move area down','Ohne Bereich':'No area','Bitte prüfen':'Review required','Lampe aus Light Manager entfernen?':'Remove light from Light Manager?','Einmalige Schaltung löschen?':'Delete one-time switching?','Einmalige Schaltung bitte für heute in der Zukunft anlegen.':'Schedule one-time switching for later today.','Szenen nach Namen zuordnen':'Assign scenes by name','Hue-Szene muss zum technischen Lichtnamen passen.':'Hue scene must match the technical light name.','Hue-Szene passt nicht zur Auswahl. Bitte neu wählen.':'Hue scene does not match the selection. Please choose again.',"Schaltaktion":"Action","Gruppe":"Group","Programme":"Programs","Zeitprogramm":"Schedule","Sensorprogramme":"Sensor programs","Messwerte":"Readings","Sonnenaufgang":"Sunrise","Sonnenuntergang":"Sunset","Anleitung":"Guide","Einstellungen":"Settings","Lichtsteuerung":"Lighting control","Sonnenzeiten und Sensorwerte":"Sun times and sensor readings","+ Programm":"+ Program","Noch keine Programme.":"No programs yet.","Aktion":"Action","Aktionen":"Actions","Öffnungskontakt":"Opening contact","Bewegungsmelder":"Motion sensor","Helligkeit":"Brightness","Pause im Urlaub":"Vacation pause","Einschalten":"Turn on","Ausschalten":"Turn off","Farbe":"Color","Weißtöne":"White tones","Letzte Einstellung":"Last setting","Kaltweiß":"Cool white","Warmweiß":"Warm white","Farbtemperatur":"Color temperature","Weißtöne von Kaltweiß nach Warmweiß":"White tones from cool white to warm white","Zuerst Lampen auswählen.":"Select lights first.","Die Auswahl unterstützt keine gemeinsamen Weißtöne.":"The selection has no shared white-tone range.","Kein gültiger Kelvin-Bereich verfügbar.":"No valid Kelvin range is available.","Gespeicherter Weißton liegt außerhalb des Lampenbereichs. Regler neu einstellen.":"The saved white tone is outside the lights' range. Adjust the slider.","Bearbeiten":"Edit","Löschen":"Delete","Auslassen":"Skip once","Zurücknehmen":"Undo skip","Heute keine Schaltzeiten.":"No scheduled actions today.","Keine Sensorprogramme.":"No sensor programs.","Vorrang aktiv":"Override active","Bereit":"Ready","Außerhalb der Gültigkeit":"Outside validity window","Mindestens ein Kontakt offen":"At least one contact is open","Mindestens ein Sensor meldet Bewegung":"At least one sensor detects motion","Nicht verfügbar":"Unavailable","nicht verfügbar":"unavailable","Offen":"Open","Geschlossen":"Closed","Bewegung":"Motion","Keine Bewegung":"No motion","Lampenstatus":"Light status","Rückfallverhalten":"Fallback","Aktuell:":"Current:","Ein":"On","Aus":"Off","Kein aktives Programm.":"No active program.","Letzte Schaltbefehle":"Recent commands","Noch keine Schaltbefehle.":"No commands yet.","Urlaubsmodus":"Vacation mode","Lampen":"Lights","Zimmer":"Rooms","Zonen":"Zones","+ Hinzufügen":"+ Add","Keine Einträge.":"No entries.","Anzeigen":"Show","Sicherung":"Backup","Sicherung erstellen":"Create backup","Sicherung wiederherstellen":"Restore backup","Oberfläche":"Interface","Integration":"Integration","Sprache":"Language","Deutsch":"German","Englisch":"English","Anzeigename":"Display name","Licht-Entität":"Light entity","Bitte wählen":"Please select","Wenn keine Regel mehr gilt":"When no rule applies","Zustand beibehalten":"Keep current state","Vorherigen Zustand wiederherstellen":"Restore previous state","Lichtgruppe":"Light group","Gruppenmitglieder (vollständig)":"Group members (complete)","Vollständige Lampenzuordnung bestätigt":"Complete light scope confirmed","Lampe":"Light","Lampengruppe":"Light group","Zone":"Zone","Programm":"Program","Schließen":"Close","Abbrechen":"Cancel","Speichern":"Save","Speichern …":"Saving …","Programmname":"Program name","Programmart":"Program type","Reihenfolge bei gleichem Vorrang":"Order for equal priority","Kleinere Zahl hat Vorrang.":"Lower numbers have priority.","Programm eingeschaltet":"Program enabled","Wochentage":"Weekdays","Gültig ab":"Valid from","Gültig bis":"Valid until","Gleiche Uhrzeit = ganztägig.":"Same time = all day.","Saison von (optional)":"Season from (optional)","Saison bis (optional)":"Season until (optional)","MM-TT":"MM-DD","Im Urlaub pausieren":"Pause during vacation","+ Schaltaktion":"+ Action","Lichtaktion":"Light action","Einschalten / Lichtwerte":"Turn on / light settings","Lampen, Gruppen, Zimmer oder Zonen":"Lights, groups, rooms or zones","Helligkeit (%)":"Brightness (%)","Leer lassen: Helligkeit unverändert.":"Leave blank to keep the current brightness.","Zeitpunkt":"Trigger","Feste Uhrzeit":"Fixed time","Uhrzeit":"Time","Versatz (Minuten)":"Offset (minutes)","Frühestens":"Earliest","Spätestens":"Latest","Bewegungs- / Präsenzsensoren":"Motion / presence sensors","Öffnungskontakte":"Opening contacts","Nachlauf ohne Bewegung (Sekunden)":"Delay after motion ends (seconds)","Freigabe nach Schließen (Sekunden)":"Release after closing (seconds)","Helligkeitssensor":"Illuminance sensor","Nur bei Dunkelheit (optional)":"Only when dark (optional)","Keine Lux-Bedingung":"No lux condition","Einschalten unter / bei (lx)":"Activate at or below (lx)","Freigabe über / bei (lx)":"Release at or above (lx)","Einschaltverzögerung (Sekunden)":"Activation delay (seconds)","Freigabeverzögerung (Sekunden)":"Release delay (seconds)","Aktion kopieren":"Copy action","Aktion entfernen":"Remove action","Sicherung zu groß (maximal 2 MB).":"Backup is too large (maximum 2 MB).","Gesamte Light-Manager-Konfiguration durch diese Sicherung ersetzen? Aktive Programme werden sofort neu bewertet.":"Replace the entire Light Manager configuration with this backup? Active programs will be re-evaluated immediately.","Eintrag löschen? Verwendete Schaltziele müssen zuvor aus Programmen entfernt werden.":"Delete this entry? Remove used targets from programs first.","Noch keine Lampen":"No lights selected","Noch keine passenden Einträge vorhanden.":"No matching entries available.","Integration unter Geräte & Dienste hinzufügen.":"Add the integration under Devices & services.","Versionskonflikt. Home Assistant neu starten und Browser neu laden.":"Version mismatch. Restart Home Assistant and reload the browser.","Versionskonflikt: Bitte Home Assistant neu starten und Browser neu laden.":"Version mismatch: restart Home Assistant and reload the browser.","Versionskonflikt: Bitte Home Assistant neu starten und den Browser neu laden.":"Version mismatch: restart Home Assistant and reload the browser.","Mo":"Mon","Di":"Tue","Mi":"Wed","Do":"Thu","Fr":"Fri","Sa":"Sat","So":"Sun","· heute ausgelassen":"· skipped today","Keine Steuerberechtigung.":"No control permission.","Unbekanntes Sicherungsformat.":"Unknown backup format.","Urlaubsmodus muss ein Schalter sein.":"Vacation mode must be a boolean.","Ungültiger Eintrag.":"Invalid entry.","IDs müssen eindeutig sein.":"IDs must be unique.","Bitte einen Namen mit höchstens 120 Zeichen eingeben.":"Enter a name with at most 120 characters.","Diese Lampe wurde bereits aufgenommen.":"This light has already been added.","Unbekanntes Zimmer / Zone.":"Unknown room / zone.","Ungültiges Rückfallverhalten.":"Invalid fallback behavior.","Ungültige Gruppenkennzeichnung.":"Invalid group flag.","Ungültige Gruppenmitglieder.":"Invalid group members.","Eine Lichtgruppe darf sich nicht selbst enthalten.":"A light group cannot contain itself.","Eine Gruppe benötigt mindestens eine aufgenommene Lampe.":"A group needs at least one managed light.","Unbekannte Programmart.":"Unknown program type.","Bitte Wochentage auswählen.":"Select weekdays.","Saison bitte als MM-TT angeben.":"Enter the season as MM-DD.","Saisonbeginn und Saisonende zusammen ausfüllen.":"Set both season start and season end.","Ein Programm benötigt mindestens eine Aktion.":"A program needs at least one action.","Aktionen benötigen eindeutige IDs.":"Actions require unique IDs.","Aktion: Schalter erforderlich.":"Action: a boolean is required.","Ungültige Lichtaktion.":"Invalid light action.","Bitte Lampen, Gruppen, Zimmer oder Zonen auswählen.":"Select lights, groups, rooms or zones.","Ungültige Farbe.":"Invalid color.","Farbe oder Farbtemperatur auswählen.":"Select either color or color temperature.","Ungültige Auslassungen.":"Invalid skips.","Ungültiges Auslassdatum.":"Invalid skip date.","Ungültiges Zeitereignis.":"Invalid time trigger.","Frühestens muss vor Spätestens liegen.":"Earliest must not be later than Latest.","Bitte Sensoren auswählen.":"Select sensors.","Freigabeschwelle muss über der Einschaltschwelle liegen.":"The release threshold must exceed the activation threshold.","Die Konfiguration wurde zwischenzeitlich geändert. Bitte neu laden; deine Eingaben bleiben erhalten.":"The configuration has changed. Reload; your draft is retained.","Die Lampe unterstützt keine Helligkeitssteuerung.":"The light does not support brightness control.","Die Lampe unterstützt keine Farbtemperatur.":"The light does not support color temperature.","Die Lampe unterstützt keine Farben.":"The light does not support colors.","Lampe nicht verfügbar.":"Light unavailable.","Sensorwert nicht verfügbar; laufender Vorrang bleibt erhalten.":"Sensor unavailable; the active override is retained.","Lux-Bedingung nicht verfügbar.":"Lux condition unavailable.","keine Lampen zugeordnet.":"no lights assigned.","bitte vollständige Gruppenmitglieder hinterlegen.":"assign all group members.","kein bekannter Ausgangszustand für die Rückkehr.":"no known initial state to restore.","Bitte zuerst die Integration Light Manager hinzufügen.":"Add the Light Manager integration first.","Light Manager zuerst als Integration hinzufügen.":"Add Light Manager as an integration first.","Reihenfolge":"Order","Sonnenversatz":"Sun offset","Nachlauf / Freigabeverzögerung":"Follow-up / release delay","Einschaltschwelle":"Activation threshold","Freigabeschwelle":"Release threshold","Einschaltverzögerung":"Activation delay","Name":"Name","Programmtyp":"Program type","Programm aktiv":"Program enabled","Im Urlaub aussetzen":"Pause during vacation","Saison einschränken":"Restrict season","Von":"From","Bis":"Until","TT.MM.":"DD.MM.","Von (TT.MM.)":"From (DD.MM.)","Bis (TT.MM.)":"Until (DD.MM.)","Schaltaktionen":"Actions","+ Schaltaktion hinzufügen":"+ Add action","Erweitert":"Advanced","Lampen auswählen":"Select lights","Suchen":"Search","Lichtentität suchen":"Search light entity","Keine Lichtentitäten verfügbar.":"No light entities available.","Lampen, Zonen oder Zimmer":"Lights, zones or rooms","Saison bitte als TT.MM. eingeben.":"Enter the season as DD.MM.","Ungültiges Saisondatum.":"Invalid season date.","Helligkeit in Prozent":"Brightness in percent","Bitte ausgewählte Lampen, Zimmer oder Zonen auswählen.":"Select managed lights, rooms or zones.","Nicht unterstützte Konfigurationsbereiche.":"Unsupported configuration sections.","Ein aktives Programm benötigt mindestens eine Aktion.":"An enabled program needs at least one action.","Ungültige Aktionen.":"Invalid actions."};
const LM_KINDS = {time:'Zeitprogramm',contact:'Öffnungskontakt',motion:'Bewegungsmelder',lux:'Helligkeit'};
Object.assign(LM_EN,{'Sensoren':'Sensors','Sensoren auswählen':'Select sensors','Sensor suchen':'Search sensors','Bei Programmende':'When the program ends','Ursprünglichen Zustand wiederherstellen':'Restore original state','Lampeneinstellung verwenden':'Use light setting','Programm beenden bei':'End program on','Überschreitung':'Above threshold','Unterschreitung':'Below threshold','Endschwelle (lx)':'End threshold (lx)','Endbedingung für (Sekunden)':'End condition duration (seconds)','Farbkreis: Pfeiltasten zum Wählen, Pos1 für Weiß.':'Color wheel: use arrow keys to select, Home for white.','Abschlussaktion':'End action','Bitte Sensoren zuerst in den Einstellungen auswählen.':'Select sensors in Settings first.','Ungültige Abschlussaktion.':'Invalid end action.','Ungültige Sensorauswahl.':'Invalid sensor selection.','Ungültiger Sensor.':'Invalid sensor.','Ungültiger Sensorname.':'Invalid sensor name.','Dieser Sensor wurde bereits aufgenommen.':'This sensor has already been selected.','Ungültige Helligkeits-Endbedingung.':'Invalid illuminance end condition.','Endschwelle muss passend zur Endbedingung über oder unter der Einschaltschwelle liegen.':'The end threshold must be above or below the activation threshold to match the selected end condition.'});
Object.assign(LM_EN,{"Sensor": "Sensor", "Sensor-Entität": "Sensor entity", "Aktueller Zustand": "Current state", "Mögliche Zustände": "Available states", "Offen-Zustände": "Open states", "Geschlossen-Zustände": "Closed states", "Mehrere Werte durch Komma trennen.": "Separate multiple values with commas.", "Offen- und Geschlossen-Zustände vollständig angeben.": "Enter both open and closed states.", "Offen- und Geschlossen-Zustände dürfen sich nicht überschneiden.": "Open and closed states must not overlap.", "Offen- und Geschlossen-Zustände zuerst in den Einstellungen festlegen.": "Configure open and closed states in Settings first.", "Zuerst Zonen, Zimmer oder Lampen auswählen.": "Select zones, rooms or lights first.", "Dem ausgewählten Zimmer sind keine Lampen zugeordnet.": "No lights are assigned to the selected room.", "Der ausgewählten Zone sind keine Lampen zugeordnet.": "No lights are assigned to the selected zone.", "Den ausgewählten Zonen und Zimmern sind keine Lampen zugeordnet.": "No lights are assigned to the selected zones and rooms.", "Die Auswahl enthält keine Lampen.": "The selection contains no lights.", "Weitere Sensoren": "Other sensors", "Unbekannt": "Unknown"});
Object.assign(LM_EN,{"Hue-Szenen": "Hue scenes", "Hue-Szene": "Hue scene", "Bitte eine mit der Auswahl verknüpfte Hue-Szene auswählen.": "Select a Hue scene linked to the selected lights.", "Ungültige Szenenverknüpfungen.": "Invalid scene links.", "Ungültige Szenenkennzeichnung.": "Invalid scene mapping flag.", "Hue-Szene nicht verfügbar.": "Hue scene unavailable.", "Keine Lampen zugeordnet.": "No lights assigned.", "Wartet auf Vorrang": "Waiting for priority", "Deaktiviert": "Disabled", "Wieder einplanen": "Reschedule", "Heute": "Today"});
const LM_DAYS = ['Mo','Di','Mi','Do','Fr','Sa','So'];
const lmAction = () => ({id:lmId(),enabled:true,mode:'on',targets:[],brightness:100,kelvin:null,rgb:null,
  event:'fixed',time:'18:00',offset:0,earliest:'00:00',latest:'23:59',sensors:[],delay:120,lux_entity:'',lux_on:80,lux_off:150,on_delay:120,end_action:'restore',lux_end:'above',skips:[]});
const LM_STYLE = `.settings-sensor-value{margin-inline-start:8px}
.tags>div{display:flex;flex-wrap:wrap;gap:2px 10px}
.time-heading{justify-content:space-between}
.program-group+.program-group{margin-top:16px}
.program-group-head{display:flex;align-items:center;gap:8px;width:100%;padding:9px 14px 9px 0;text-align:left;color:inherit}
.program-group-head strong{font-size:16px}
.muted{font-size:12px;color:var(--lm-muted);line-height:1.5}
.content{padding:8px 16px 16px}
.list-tools{display:flex;align-items:center;gap:8px;flex-shrink:0}
.tag{display:inline-flex;font-size:12px;color:var(--lm-muted);margin:0 10px 0 0}
.tag.on{color:var(--lm-accent)}
.empty{padding:24px 0;color:var(--lm-muted);line-height:1.6}
.empty strong{display:block;font-weight:400}
.alert{margin:8px 0;padding:10px 12px;border-radius:4px;background:color-mix(in srgb,var(--warning-color,#ffb300) 10%,transparent);color:var(--primary-text-color,#212121);font-size:13px;line-height:1.5}
.alert.error{background:color-mix(in srgb,var(--error-color,#db4437) 8%,transparent);color:var(--error-color,#db4437)}
.program{padding:10px 0 6px;border-bottom:1px solid var(--lm-line)}
.program:last-child{border-bottom:0}
.program-head{display:flex;align-items:center;justify-content:space-between;gap:12px}
.program-heading{flex:1;min-width:0}
.program-title{display:flex;align-items:center;gap:8px;padding:0;color:var(--primary-text-color,#212121);font-size:14px;text-align:left}
.program-title span{overflow-wrap:anywhere}
.tags{display:grid;gap:4px;margin:6px 0 0 28px;font-size:12px;color:var(--lm-muted)}
.program.disabled>.program-head,.action.disabled>.action-info{opacity:.55}
.action{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:7px 0;margin-left:28px;border-top:1px solid var(--lm-line)}
.program-head+.actions{margin-top:7px}
.action-info{display:flex;flex-direction:column;gap:3px;min-width:0;overflow-wrap:anywhere}
.action-info strong{font-size:14px;font-weight:500}
.action-info>span{font-size:13px}
.summary{font-size:13px;line-height:1.5}
.switch{display:flex;align-items:center;gap:8px;min-height:32px;font-size:13px}
.overview-panel{border-bottom:1px solid var(--lm-line)}
.overview-toggle{display:flex;align-items:center;gap:6px;padding:10px 16px;color:var(--lm-muted);font-size:12px;border-radius:0}
.overview{padding:0 16px 14px}
.overview[hidden]{display:none}
.sun-row{display:flex;align-items:center;gap:28px;padding:4px 0 12px}
.sun-value{display:inline-flex;align-items:center;gap:8px;font-size:14px;font-variant-numeric:tabular-nums}
.overview-group+.overview-group{margin-top:14px}
.sensor-grid{display:flex;flex-wrap:wrap;align-items:center;gap:9px 24px}
.sensor-value{display:inline-flex;flex:0 1 auto;max-width:100%;align-items:center;justify-content:flex-start;gap:8px;min-width:0;font-size:13px;line-height:1.5}
.sensor-label{min-width:0;overflow-wrap:anywhere}
.sensor-state{display:inline-flex;align-items:center;gap:6px;flex-shrink:0;font-variant-numeric:tabular-nums}
.visually-hidden{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.backup-actions{margin-top:12px}
.divider{border:0;border-top:1px solid var(--lm-line);margin:20px 0}
.planned-row{padding:12px 0}
.planned-row strong{font-size:13px}
.planned-row.skipped strong{text-decoration:line-through}
.planned-time{white-space:nowrap}
.history{margin-top:12px}
.schedule-fields{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
@media(max-width:600px){.schedule-fields{grid-template-columns:repeat(2,minmax(0,1fr))}
}
.choices{display:flex;flex-wrap:wrap;gap:9px 14px;max-height:180px;overflow:auto;padding:8px 0}
.choices label{display:flex;align-items:center;gap:7px;font-size:13px;min-height:28px;max-width:100%;overflow-wrap:anywhere}
.choices.stack{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}
.days-field>span{font-size:14px;font-weight:500;color:var(--primary-text-color,#212121)}
.choices.days{gap:6px}
.days label{position:relative;cursor:pointer;min-height:0}
.days input{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer}.days input:checked+span{color:var(--lm-accent);background:color-mix(in srgb,var(--lm-accent) 12%,transparent);border-color:transparent}.days input:focus-visible+span{outline:2px solid var(--lm-accent)}
.days span{pointer-events:none;display:block;padding:8px 11px;border:1px solid var(--lm-line);border-radius:16px;font-size:12px}
.editor-action{border:1px solid var(--lm-line);border-radius:8px;padding:16px;margin:12px 0;background:transparent}
.editor-action-head{display:flex;align-items:center;justify-content:space-between;gap:12px}
.action-fold{display:flex;align-items:center;gap:8px;flex:1;min-width:0;padding:4px 0;text-align:left;color:var(--primary-text-color,#212121);border-radius:4px}
.action-fold-text{display:flex;flex-direction:column;gap:5px;min-width:0;overflow-wrap:anywhere}
.action-fold-text strong{font-size:14px;font-weight:500}
.editor-action-body{margin-top:16px;padding-top:16px;border-top:1px solid var(--lm-line)}
.editor-action .list-tools{gap:0}
.technical-id{font-family:monospace;overflow-wrap:anywhere}
.lamp-selection{max-height:55dvh;grid-template-columns:1fr!important}
.lamp-selection [hidden]{display:none}
.season-dates{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;max-width:420px;margin-top:12px}
.actions-heading{font-size:14px;font-weight:500;margin:8px 0 12px}
.advanced summary{cursor:pointer;color:var(--lm-muted);font-size:12px;margin-top:12px}
.brightness-row{display:flex;align-items:center;gap:16px}
.brightness-row output{min-width:48px;font-size:13px;font-variant-numeric:tabular-nums;text-align:right}
.white-labels{display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:12px}
.white-labels output{font-variant-numeric:tabular-nums}
.language-picker{display:flex;gap:8px}
.guide{font-size:14px;line-height:1.65;padding:10px 0}
.guide pre{background:var(--secondary-background-color,#f5f5f5);padding:12px;border-radius:4px;white-space:pre-wrap}
@media(max-width:600px){.content{padding:4px 12px 12px}
.program-head{align-items:center;gap:8px}
.program-title{font-size:14px}
.program-group-head strong{font-size:15px}
.action{gap:10px}
.choices.stack{grid-template-columns:1fr}
.editor-action{padding:12px}
.editor-action-head{align-items:flex-start;flex-wrap:wrap;gap:8px}
.action-fold{flex-basis:100%}
.editor-action-head>.list-tools{margin-left:28px;justify-content:flex-end;flex:1}
.days{gap:5px}
.days span{padding:8px 10px}
}
.entity-label{display:flex;flex-direction:column;gap:4px;min-width:0}
.entity-label strong{font-size:14px;font-weight:500}
.lamp-selection label{padding:7px 0}
.target-choices{border:1px solid var(--lm-line);border-radius:6px;overflow:hidden}
.target-choices details+details{border-top:1px solid var(--lm-line)}
.target-choices summary{padding:12px;cursor:pointer;font-size:14px;font-weight:500}
.colour-control{align-items:center;padding:8px 16px 16px;gap:16px}
.colour-control>span{align-self:flex-start}
.colour-wheel{width:min(100%,340px);aspect-ratio:1;border-radius:50%;position:relative;touch-action:none;cursor:crosshair;background:radial-gradient(circle closest-side,#fff 0%,#ffffff00 100%),conic-gradient(#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00);flex-shrink:0}
.colour-wheel:focus-visible{outline:3px solid var(--lm-accent);outline-offset:5px}
.colour-marker{position:absolute;width:26px;height:26px;transform:translate(-50%,-50%);border-radius:50%;border:3px solid #fff;box-shadow:0 1px 5px #0009,0 0 0 1px #0004;pointer-events:none}
.colour-preview{display:flex;align-items:center;gap:10px;font-size:13px;font-family:monospace}
.colour-preview>span{width:24px;height:24px;border-radius:50%;border:1px solid var(--lm-line)}
.choices.lamp-selection{grid-auto-rows:max-content;align-content:start;gap:0;max-height:min(55dvh,520px);overflow-y:auto;overflow-x:hidden;padding:0 4px}
.choices.lamp-selection>label{align-items:flex-start;min-height:0;padding:12px 0;border-bottom:1px solid var(--lm-line);line-height:1.45}
.choices.lamp-selection>label:last-child{border-bottom:0}
.choices.lamp-selection .entity-label{display:grid;grid-template-columns:minmax(0,1fr);gap:4px;flex:1;min-width:0}
.choices.lamp-selection .entity-label strong{display:block;white-space:normal;overflow-wrap:anywhere;line-height:1.45}
.member-fold{display:flex;align-items:center;gap:8px;padding:0;color:var(--primary-text-color,#212121);text-align:left;min-width:0;width:100%}
.member-fold strong{flex:1;min-width:0;overflow-wrap:anywhere}
.assignment-group{border-bottom:1px solid var(--lm-line)}
.assignment-group:last-child{border-bottom:0}
.assigned-lamps{padding:0 0 12px 28px;font-size:13px;line-height:1.5}
.assigned-lamps>div{padding:4px 0;overflow-wrap:anywhere}
.planned-heading{margin:10px 0 6px}
.planned-row{display:grid;grid-template-columns:44px minmax(0,1fr) auto;gap:3px 10px;align-items:center;padding:9px 0}
.planned-time{font-size:14px;font-variant-numeric:tabular-nums;line-height:1.4}
.planned-cover{display:flex;flex-direction:column;gap:3px;min-width:0;overflow-wrap:anywhere}
.planned-target{display:flex;align-items:baseline;gap:6px 14px;flex-wrap:wrap;min-width:0}
.planned-cover strong{font-size:13px;font-weight:500}
.planned-position{font-size:12px;color:var(--lm-muted);font-variant-numeric:tabular-nums}
.planned-detail{font-size:12px;color:var(--lm-muted);line-height:1.4}
.planned-action,.sensor-action{align-self:center}
.sensor-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:3px 10px;padding:9px 0}
.sensor-summary{display:flex;flex-direction:column;gap:3px;min-width:0;overflow-wrap:anywhere}
.sensor-summary strong{font-size:13px;font-weight:500}
.sensor-paused .sensor-summary{opacity:.6}
.plan-status{color:var(--lm-accent);font-size:12px}
@media(max-width:600px){.planned-row{grid-template-columns:40px minmax(0,1fr) auto;gap:3px 8px}
.planned-target{flex-direction:column;align-items:flex-start;gap:2px}
.planned-time{font-size:13px}
.sensor-row{grid-template-columns:minmax(0,1fr) minmax(0,auto);gap:8px}
}
.choices.stack{grid-auto-rows:max-content;align-content:start}
.choices.scene-choices{display:grid;grid-template-columns:minmax(0,1fr);grid-auto-rows:max-content;align-content:start;gap:0;max-height:300px;overflow-y:auto;overflow-x:hidden;padding:0 4px}
.choices.scene-choices>label{display:grid;grid-template-columns:18px minmax(0,1fr) minmax(0,1.15fr);gap:10px;align-items:start;min-height:0;padding:8px 0;border-bottom:1px solid var(--lm-line);line-height:1.45}
.choices.scene-choices>label:last-child{border-bottom:0}
.scene-choices .entity-label{display:contents}
.scene-choices .entity-label strong{min-width:0}
.scene-choices .entity-label strong{font-size:13px}
.scene-choices .entity-label strong{display:block;white-space:normal;overflow-wrap:anywhere;line-height:1.45}
.light-selection-divider{width:100%;border:0;border-top:2px solid var(--lm-line);margin:8px 0;grid-column:1/-1}
.choices.lamp-assignment>label{padding:6px 0}
.choices.lamp-assignment .entity-label strong{font-size:13px}
.choices.lamp-table>label{display:grid;grid-template-columns:18px minmax(0,1fr) minmax(0,1.3fr);gap:10px;align-items:start;padding:6px 0;min-height:32px}
.choices.lamp-table .entity-label{display:contents}
.choices.lamp-table .entity-label strong{font-size:13px;line-height:1.35}
.choices.lamp-table>label[hidden]{display:none}
.lamp-table .light-selection-divider{margin:5px 0}
@media(max-width:600px){.planned-row[data-once-program] .planned-action{grid-column:2/-1;justify-self:end}
}
@media (max-width:600px){.program-head>.list-tools{display:grid;grid-template-columns:repeat(2,44px);gap:0;justify-items:center;flex-shrink:0}
.program-head>.list-tools [data-op="move-program"],.program-head>.list-tools [data-op="copy-program"]{display:none}
.program-head .tags{margin-left:28px;overflow-wrap:anywhere}
.editor-action-head>.list-tools{margin-left:0;gap:4px}
.time-heading{gap:4px}
.choices:not(.days) label{min-height:44px}
.target-choices summary{min-height:44px}
}
.daily-history-row{display:grid;grid-template-columns:42px minmax(0,1fr) auto;gap:10px;align-items:start;padding:10px 0;border-bottom:1px solid var(--lm-line);font-size:12px}
.daily-history-row:last-child{border-bottom:0}
.daily-command{display:flex;flex-direction:column;gap:3px;min-width:0;overflow-wrap:anywhere}
.daily-command strong{font-size:13px;font-weight:500}
.command-result{display:flex;align-items:center;gap:4px;font-size:11px;white-space:nowrap;color:var(--success-color,#388e3c)}
.failed .command-result,.failure-reason{color:var(--error-color,#db4437)}
@media(max-width:380px){.daily-history-row{gap:6px;grid-template-columns:36px minmax(0,1fr) auto}
.command-result{font-size:10px}
}
/* Lighting-specific arrangement; shared controls come from UI_CSS. */
:host{--lm-accent:var(--primary-color,#03a9f4);--lm-muted:var(--secondary-text-color,#727272);--lm-line:var(--divider-color,#e0e0e0);--lm-bg:var(--ha-card-background,var(--card-background-color,#fff))}
.list-tools{display:flex;align-items:center;gap:8px;flex-shrink:0}
.program-head{display:flex;align-items:center;justify-content:space-between;gap:12px}
.program-heading{flex:1;min-width:0}
.program-title{display:flex;align-items:center;gap:8px;padding:0;text-align:left;color:var(--primary-text-color,#212121);font-size:14px}
.program-group-head{display:flex;align-items:center;gap:8px;width:100%;padding-left:0;color:var(--primary-text-color,#212121);text-align:left}
.program-group-head strong{font-size:16px}.program-group-head small{margin-left:auto}
.content{padding:8px 16px 16px}.form{min-height:0;overscroll-behavior:contain}.full{min-width:0}
.alert{padding:12px 16px;font-size:13px;color:var(--error-color,#db4437);background:color-mix(in srgb,var(--error-color,#db4437) 8%,transparent)}
.toggle>span:last-child{display:none}.settings-heading-row h3{font-size:14px}
.sun-value .ui-icon{color:var(--primary-color,#03a9f4)}.sensor-state .ui-icon{width:18px;height:18px}
.dialog-host footer .error{flex-basis:100%}
@media(max-width:600px){.content{padding:4px 12px 12px}.program-head{gap:8px}.program-head>.list-tools{display:grid;grid-template-columns:repeat(2,40px);gap:0;flex-shrink:0}.program-head>.list-tools [data-op="move-program"],.program-head>.list-tools [data-op="copy-program"]{display:none}.program-title{font-size:14px}.program-group-head strong{font-size:15px}.fields{grid-template-columns:minmax(0,1fr)}}
`;

class LightManagerCard extends HTMLElement {
  constructor(){super();this.attachShadow({mode:'open'});this.tab='programs';this.section='lamps';this.error='';this.expanded=new Set();
    this.settingsOpen=new Set();this.memberListsOpen=new Set();
    this.shadowRoot.addEventListener('click',e=>this.click(e));this.shadowRoot.addEventListener('input',e=>this.input(e));this.shadowRoot.addEventListener('change',e=>this.change(e));
    this.shadowRoot.addEventListener('pointerdown',e=>this.wheelPointer(e));
    this.shadowRoot.addEventListener('pointermove',e=>{if(e.target.hasPointerCapture?.(e.pointerId))this.wheelPointer(e);});
    this.shadowRoot.addEventListener('pointerup',e=>{if(e.target.hasPointerCapture?.(e.pointerId))e.target.releasePointerCapture(e.pointerId);});
    this.shadowRoot.addEventListener('keydown',e=>this.wheelKey(e));
    this.shadowRoot.addEventListener('toggle',e=>{if(this.editor&&e.target.dataset.targetGroup){this.editor.targetGroups??={};this.editor.targetGroups[e.target.dataset.targetGroup]=e.target.open;}},true);
    this.shadowRoot.addEventListener('toggle',e=>{if(this.editor&&e.target.dataset.lampSection){this.editor.lampSections??={};this.editor.lampSections[e.target.dataset.lampSection]=e.target.open;}},true);
    this.shadowRoot.addEventListener('keydown',e=>{if(e.key==='Escape'&&this.editor&&!this.busy){this.editor=null;this.render();}});
  }
  language(){const key='light-manager:language:'+(this._hass?.user?.id||'local');if(this.languageKey!==key){this.languageKey=key;try{this._language=localStorage.getItem(key)||'de';}catch{this._language='de';}}return this._language==='en'?'en':'de';}
  t(value){const text=String(value??'');if(this.language()!=='en')return text;if(LM_EN[text])return LM_EN[text];
    if(text.startsWith('– '))return '– '+this.t(text.slice(2));if(text.startsWith('· '))return '· '+this.t(text.slice(2));
    let m;if((m=text.match(/^(\d+) (Aktion|Aktionen)$/)))return m[1]+(m[1]==='1'?' action':' actions');
    if((m=text.match(/^Schaltaktion (\d+)$/)))return 'Action '+m[1];
    if((m=text.match(/^(.+) bearbeiten$/)))return this.t(m[1])+' settings';
    if((m=text.match(/^(Programm|Aktion|Schaltaktion) (.+) aktivieren$/)))return 'Enable '+this.t(m[1]).toLowerCase()+' '+m[2];
    if(text.startsWith('Oberfläche '))return text.replace('Oberfläche ','Interface ');
    if(text.startsWith('Light Manager · Oberfläche '))return text.replace('Oberfläche ','Interface ');
    if(text.startsWith('Sonnenaufgang')||text.startsWith('Sonnenuntergang'))return text.replace('Sonnenaufgang','Sunrise').replace('Sonnenuntergang','Sunset').replace('Min.','min');
    if((m=text.match(/^Unter (.+) lx · Freigabe ab (.+) lx$/)))return `At or below ${m[1]} lx · Release at ${m[2]} lx`;
    if(text.startsWith('Freigabe voraussichtlich '))return text.replace('Freigabe voraussichtlich ','Release expected at ').replace(' Uhr','');
    if(text.startsWith('Aktuell: '))return text.replace('Aktuell: ','Current: ');
    if(/^\d{2}:\d{2} Uhr$/.test(text))return text.replace(' Uhr','');
    return text;}
  user(value){return `<span data-user-content>${lmEsc(value)}</span>`;}
  message(value){const text=String(value??'');if(this.language()!=='en')return text;if(LM_EN[text])return LM_EN[text];
    const migration=text.match(/^Migration 0\.3\.3: (\d+) unpassende Szenenverknüpfungen entfernt, (\d+) Schaltaktionen deaktiviert\. Bitte Szenen neu wählen\.$/);if(migration)return `Migration 0.3.3: ${migration[1]} nonmatching scene links removed, ${migration[2]} actions disabled. Please select scenes again.`;
    const match=text.match(/^(.*?): (.+)$/);if(match){let prefix=match[1],tail=match[2];
      const number=tail.match(/^Wert zwischen (.+) und (.+) erforderlich\.$/);if(number)return this.t(prefix)+`: Enter a value between ${number[1]} and ${number[2]}.`;
      if(LM_EN[tail])return prefix+': '+LM_EN[tail];}
    return text.replace(/^Ungültige (.+)-Entität: /,'Invalid $1 entity: ').replace(/^Ungültige Uhrzeit: /,'Invalid time: ').replace(/^Zyklische Lichtgruppe: /,'Cyclic light group: ').replace(/^Farbtemperatur außerhalb des Bereichs (.+) K\.$/,'Color temperature outside the range $1 K.');}
  translateDom(root){if(this.language()!=='en')return;const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;while((node=walker.nextNode())){
      if(node.parentElement?.closest('[data-user-content],[data-message],pre,code,svg'))continue;
      const text=node.textContent,trim=text.trim();if(trim)node.textContent=text.replace(trim,this.t(trim));}
    for(const element of root.querySelectorAll('[title],[aria-label],[placeholder]')){
      if(element.closest('[data-user-content]'))continue;for(const key of ['title','aria-label','placeholder'])if(element.hasAttribute(key))element.setAttribute(key,this.t(element.getAttribute(key)));}}
  setConfig(config){this.cardConfig=config||{};}
  getCardSize(){return 6;}
  static getStubConfig(){return {type:'custom:light-manager-card'};}
  connectedCallback(){
    this.unbindUI ||= bindUI(this.shadowRoot,({action,data,checked,element})=>{
      if(this.busy)return;
      if(action==='navigate'){
        const page=data.page==='help'?'guide':data.page;
        this.resetFolds();this.tab=page;this.error='';this.render();
      }
      if(action==='legacy-toggle'){
        const input=document.createElement('input');
        for(const attr of element.attributes)input.setAttribute(attr.name,attr.value);
        input.type='checkbox';input.checked=checked;
        this.change({target:input});
      }
    });
    this.timer=setInterval(()=>this.refresh(),5000);this.refresh();}
  disconnectedCallback(){clearInterval(this.timer);this.unbindUI?.();this.unbindUI=null;}
  set hass(value){this._hass=value;if(!this.data&&!this.loading)this.refresh();}
  get config(){return this.data?.config;}
  get catalog(){return this.data?.catalog||[];}
  entityName(e){const saved=this.config?.sensors.find(s=>s.entity===e)?.name;return this.config?.lamps.find(l=>l.entity===e)?.name||(saved&&saved!==e?saved:null)||this._hass?.states[e]?.attributes?.friendly_name||saved||e;}
  isLux(s){return s.attributes?.device_class==='illuminance'||['lx','lux','klx'].includes(s.attributes?.unit_of_measurement);}
  selectedSensors(){return this.config.sensors.map(s=>({...this.catalog.find(x=>x.entity===s.entity),...s,name:this.entityName(s.entity),attributes:this.catalog.find(x=>x.entity===s.entity)?.attributes||this._hass.states[s.entity]?.attributes||{}}));}
  contactValue(e){const s=this.config.sensors.find(s=>s.entity===e),value=this._hass.states[e]?.state;if(value==null||['unknown','unavailable',''].includes(value))return null;const binary=e.startsWith('binary_sensor.'),opened=s?.open_states||(binary?['on']:[]),closed=s?.closed_states||(binary?['off']:[]);return opened.includes(value)?true:closed.includes(value)?false:null;}
  time(value){return value?new Intl.DateTimeFormat(this.language()==='en'?'en-GB':'de-DE',{timeZone:this.data?.timezone||'Europe/Berlin',hour:'2-digit',minute:'2-digit'}).format(new Date(value)):'—';}
  async refresh(){if(!this._hass||this.loading||this.busy)return;this.loading=true;try{
    this.data=await this._hass.callWS({type:'light_manager/get'});if(!this.editor)this.render();else{this.syncSceneOptions();const overview=this.shadowRoot.querySelector('.overview');if(overview){overview.innerHTML=this.overviewContent();this.translateDom(overview);}}
  }catch(e){this.error=e.message||String(e);if(!this.editor)this.render();}finally{this.loading=false;}}
  async save(config,revision=this.data.revision){if(this.busy)return false;if(this.data?.version!==LM_VERSION||this.data?.schema!==4){this.error='Versionskonflikt: Bitte Home Assistant neu starten und Browser neu laden.';return false;}this.busy=true;this.error='';try{
    const r=await this._hass.callWS({type:'light_manager/save',revision,config});
    if(r.version!==LM_VERSION||r.schema!==4)throw Error('Versionskonflikt: Bitte Home Assistant neu starten und den Browser neu laden.');
    this.data=r;return true;
  }catch(e){this.error=e.message||String(e);return false;}finally{this.busy=false;}}
  async commit(){const ed=this.editor;if(!ed)return;if(ed.section==='programs'){if((ed.value.actions.length&&!ed.value.targets.length)||ed.mixedProgramTargets){this.error='Zuerst Bereiche oder Lampen auswählen.';this.render();return;}for(const a of ed.value.actions){if(a.mode==='on'&&this.colourMode(a)==='white'){const r=this.whiteRange(a);if(!r.valid||a.kelvin<r.min||a.kelvin>r.max){this.error=r.reason||'Gespeicherter Weißton liegt außerhalb des Lampenbereichs. Regler neu einstellen.';this.render();return;}}}}const c=lmClone(this.config);
    if(ed.section==='lamp_selection'){const chosen=new Set(ed.value.entities);c.lamps=c.lamps.filter(l=>chosen.has(l.entity));for(const lamp of c.lamps)this.applyScenePrefix(lamp);for(const entity of chosen){if(!c.lamps.some(l=>l.entity===entity)){const x=this.catalog.find(x=>x.entity===entity);c.lamps.push(this.applyScenePrefix({id:lmId(),name:x?.name||entity,entity,rooms:[],zones:[],fallback:'off',members:[],is_group:!!(x?.attributes.is_hue_group||x?.attributes.entity_id)}));}}if(await this.save(c,ed.revision))this.editor=null;this.render();return;}
    if(ed.section==='sensor_selection'){const previous=new Map(c.sensors.map(s=>[s.entity,s]));c.sensors=ed.value.entities.map(entity=>previous.get(entity)||{entity,name:this.catalog.find(x=>x.entity===entity)?.name||entity});if(await this.save(c,ed.revision))this.editor=null;this.render();return;}
    if(ed.section==='sensors'){const value=lmClone(ed.value),values=ed.contactInputs;if(values){const opened=values.open_states.trim(),closed=values.closed_states.trim();if(!opened&&!closed){delete value.open_states;delete value.closed_states;}else{value.open_states=opened.split(',').map(v=>v.trim());value.closed_states=closed.split(',').map(v=>v.trim());}}const index=c.sensors.findIndex(s=>s.entity===value.entity);if(index>=0)c.sensors[index]=value;if(await this.save(c,ed.revision))this.editor=null;this.render();return;}
    if(ed.section==='programs'&&ed.value.season_enabled){try{const dates={};for(const key of ['season_from','season_to']){const existing=ed.value[key];dates[key]=this.parseSeason(ed.seasonInputs?.[key]??(existing?existing.slice(3,5)+'.'+existing.slice(0,2):''));}Object.assign(ed.value,dates);}catch(err){this.error=err.message;this.render();return;}}
    if(ed.section==='backup'){return;}
    if(['rooms','zones'].includes(ed.section)){const selected=new Set(ed.lampIds);for(const lamp of c.lamps){if(!selected.has(lamp.id))lamp[ed.section]=lamp[ed.section].filter(id=>id!==ed.value.id);else if(!lamp[ed.section].includes(ed.value.id))lamp[ed.section].push(ed.value.id);}}
    if(ed.value.id){const index=c[ed.section].findIndex(v=>v.id===ed.value.id);if(index<0)c[ed.section].push(lmClone(ed.value));else c[ed.section][index]=lmClone(ed.value);}
    if(await this.save(c,ed.revision))this.editor=null;this.render();}
  lampAreaName(entity){return this.data.areas?.find(area=>area.id===this.data.lamp_areas?.[entity])?.name||this.t('Ohne Bereich');}
  areaTargets(action){const used=new Set(this.config.lamps.map(l=>this.data.lamp_areas?.[l.entity]));
    const areas=(this.data.areas||[]).filter(a=>used.has(a.id)||action.targets.includes(a.id));
    return [...areas,...action.targets.filter(id=>id.startsWith('area:')&&!areas.some(a=>a.id===id)).map(id=>({id,name:id.slice(5)+' · '+this.t('Nicht verfügbar')})),
      ...[...this.config.rooms,...this.config.zones].filter(item=>action.targets.includes(item.id)).map(item=>({...item,name:item.name+' · '+this.t('Bitte prüfen')}))];
  }
  lampAreaGroups(action={targets:[]}){
    const areas=this.areaTargets(action), order=this.config.area_order||[], rank=new Map(order.map((id,i)=>[id,i]));
    const byName=(a,b)=>a.name.localeCompare(b.name,this.language(),{sensitivity:'base'})||a.id.localeCompare(b.id);
    const groups=areas.sort((a,b)=>(rank.get(a.id)??Infinity)-(rank.get(b.id)??Infinity)||byName(a,b))
      .map(area=>({...area,lamps:[]}));
    const byId=new Map(groups.map(group=>[group.id,group]));
    const unassigned={id:'',name:this.t('Ohne Bereich'),lamps:[]};
    for(const lamp of this.config.lamps){
      (byId.get(this.data.lamp_areas?.[lamp.entity])||unassigned).lamps.push(lamp);
    }
    if(unassigned.lamps.length)groups.push(unassigned);
    for(const group of groups)group.lamps.sort(byName);
    return groups;
  }
  lampSettings(){
    const groups=this.lampAreaGroups(), sortable=groups.filter(group=>group.id);
    return groups.map(group=>{
      const id=lmEsc(group.id), open=this.memberListsOpen.has('lamp-area:'+group.id), index=sortable.indexOf(group);
      const move=(delta,label,arrow)=>this.btn('move-area',arrow,`data-id="${id}" data-delta="${delta}" title="${this.t(label)}" aria-label="${this.t(label)}"`,'icon');
      return `<div class="assignment-group"><div class="setting-row"><div class="row-text">${this.btn('fold-members',this.chevron(open)+`<strong>${this.user(group.name)}</strong>`,`data-section="lamp-area" data-id="${id}" aria-expanded="${open}"`,'member-fold')}</div>
        <div class="list-tools">${index>0?move(-1,'Bereich nach oben','↑'):''}${index>=0&&index<sortable.length-1?move(1,'Bereich nach unten','↓'):''}</div></div>
        <div class="assigned-lamps" ${open?'':'hidden'}>${group.lamps.map(lamp=>`<div class="setting-row"><div class="row-text"><strong>${this.user(lamp.name)}</strong></div><div class="list-tools">${this.editBtn('lamps',lamp.id)}${this.removeBtn('lamps',lamp.id)}</div></div>`).join('')}</div></div>`;
    }).join('')||'<p class="version-info">Keine Einträge.</p>';
  }
  targets(){return [...this.config.lamps,...(this.data.areas||[]),...this.config.zones,...this.config.rooms];}
  targetNames(a){return a.targets.map(id=>this.targets().find(t=>t.id===id)?.name||id).join(', ')||this.t('Noch keine Lampen');}
  actionText(a){if(a.mode==='scene')return this.t('Hue-Szene')+' · '+this.sceneName(a.scene);if(a.mode==='off')return this.t('Ausschalten');return [this.t('Einschalten'),a.brightness!=null?a.brightness+' %':null,a.kelvin?a.kelvin+' K':a.rgb?this.t('Farbe'):null].filter(Boolean).join(' · ');}
  when(a,kind){
    if(kind==='time'){
      const due=this.data?.calculated?.[a.id], clock=due?this.time(due):a.time;
      if(a.event==='fixed')return clock+' Uhr';
      const trigger=this.t(a.event==='sunrise'?'Sonnenaufgang':'Sonnenuntergang');
      const offset=a.offset?' '+(a.offset>0?'+':'')+a.offset+' Min.':'';
      return (due?clock+' Uhr · ':'')+trigger+offset+' · '+a.earliest+'–'+a.latest;
    }
    if(kind==='lux')return this.language()==='en'?`Start ≤ ${a.lux_on} lx · End ${a.lux_end==='below'?'≤':'≥'} ${a.lux_off} lx / ${a.delay} s`:`Start ≤ ${a.lux_on} lx · Ende ${a.lux_end==='below'?'≤':'≥'} ${a.lux_off} lx / ${a.delay} s`;
    return kind==='contact'?'Mindestens ein Kontakt offen':'Mindestens ein Sensor meldet Bewegung';}
  btn(op,label,extra='',cls=''){
    const symbols={'edit':'edit','delete':'trash','copy-program':'copy','copy-action':'copy','remove-action':'trash','cancel':'close'};
    const symbol=['move-program','move-area'].includes(op)?(label==='↑'?'up':'down'):symbols[op];
    let html;
    if(cls.split(' ').includes('icon')&&symbol){
      html=iconButton({icon:symbol,label:this.t(op==='cancel'?'Schließen':op==='edit'?'Bearbeiten':op.includes('copy')?'Kopieren':op==='move-program'?(label==='↑'?'Programm nach oben':'Programm nach unten'):'Löschen'),action:'legacy',disabled:this.busy,danger:cls.includes('danger')});
    }else{
      html=uiButton({label:'',action:'legacy',variant:cls.includes('primary')?'primary':cls.includes('danger')?'danger':'text',disabled:this.busy});
      html=html.replace('<span></span>',label.startsWith('+')?uiIcon('add')+'<span>'+this.t(label.replace(/^\+\s*/,''))+'</span>':label);
    }
    return html.replace('<button ',`<button data-op="${op}" ${extra} `).replace('class="',`class="${cls} `);
  }
  icon(kind){return uiIcon(({delete:'trash',sun:'illuminance'})[kind]||kind);}
  chevron(expanded){return uiIcon('chevron',{expanded});}
  toggle(checked,label,extra=''){
    return uiToggle({label,checked,action:'legacy-toggle',disabled:this.busy}).replace('<button ',`<button ${extra} `);
  }
  editBtn(section,id){return this.btn('edit',this.icon('edit'),`data-section="${section}" data-id="${lmEsc(id)}" title="Bearbeiten" aria-label="Bearbeiten"`,'icon');}
  removeBtn(section,id){return this.btn('delete',this.icon('delete'),`data-section="${section}" data-id="${lmEsc(id)}" title="Löschen" aria-label="Löschen"`,'icon danger');}
  empty(title,body){return `<div class="empty"><strong>${title}</strong><span class="muted">${body}</span></div>`;}
  render(){const d=this.data,ed=this.editor,sameEditor=ed&&ed===this.renderedEditor;
    const focused=this.shadowRoot.activeElement;
    const focusState=sameEditor&&focused?.closest('dialog')?{path:focused.dataset.path,start:focused.selectionStart,end:focused.selectionEnd}:null;
    if(ed&&!this.renderedEditor&&focused?.dataset.op)this.returnFocus={op:focused.dataset.op,id:focused.dataset.id,section:focused.dataset.section};
    const scroll=sameEditor?(this.shadowRoot.querySelector('.form')?.scrollTop||0):0;
    const navScroll=this.shadowRoot.querySelector('nav')?.scrollLeft||0;
    if(!this.shadowRoot.querySelector('ha-card'))this.shadowRoot.innerHTML='<style></style><ha-card></ha-card><div class="dialog-host"></div>';
    this.shadowRoot.querySelector('style').textContent=UI_CSS+'\n'+LM_STYLE;
    this.shadowRoot.querySelector('ha-card').innerHTML=`
      ${navigation({label:this.t('Lichtsteuerung'),items:[{id:'programs',label:this.t('Programme')},{id:'time',label:this.t('Zeitprogramm'),icon:'schedule'},{id:'sensors',label:this.t('Sensorprogramme'),icon:'sensors'}],active:this.tab==='guide'?'help':this.tab==='status'?'settings':this.tab,helpLabel:this.t('Anleitung'),settingsLabel:this.t('Einstellungen')})}
      ${d&&['programs','sensors'].includes(this.tab)?this.overview():''}
      <div class="content">${this.error&&!ed?`<div class="alert error" role="alert">${lmEsc(this.message(this.error))}</div>`:''}
      ${d&&d.version!==LM_VERSION?'<div class="alert error">Versionskonflikt. Home Assistant neu starten und Browser neu laden.</div>':''}
      ${!d?this.empty('Integration unter Geräte & Dienste hinzufügen.',''):
        (this.tab==='settings'?this.settings():this.tab==='time'?this.timePage():this.tab==='sensors'?this.sensorPage():this.tab==='status'?this.statusPage():this.tab==='guide'?`<article class="guide">${versionInfo({frontend:LM_VERSION,backend:d.version,ui:UI_VERSION,label:this.t('Oberfläche'),backendLabel:this.t('Integration')})}${this.guide()}</article>`:this.programPage())}</div>`;
    const previousDialog=this.shadowRoot.querySelector('dialog');
    previousDialog?.close();
    this.shadowRoot.querySelector('.dialog-host').innerHTML=ed?this.dialog():'';
    const modal=this.shadowRoot.querySelector('dialog');
    if(modal){
      modal.querySelector('[data-ui="close-dialog"]').disabled=!!this.busy;
      modal.addEventListener('cancel',event=>{event.preventDefault();if(!this.busy){this.editor=null;this.error='';this.render();}});
      modal.addEventListener('close',()=>{if(this.editor===ed&&modal.isConnected){this.editor=null;this.error='';this.render();}});
      modal.showModal();
    }else if(this.returnFocus){
      const f=this.returnFocus;
      const button=[...this.shadowRoot.querySelectorAll('button[data-op]')].find(b=>b.dataset.op===f.op&&b.dataset.id===f.id&&b.dataset.section===f.section);
      button?.focus({preventScroll:true});this.returnFocus=null;
    }
    this.shadowRoot.querySelector('nav').scrollLeft=navScroll;
    if(ed){const form=this.shadowRoot.querySelector('.form');if(form)form.scrollTop=scroll;
      if(!sameEditor)this.shadowRoot.querySelector('.form input,.form select')?.focus({preventScroll:true});
      requestAnimationFrame(()=>{if(this.editor===ed&&form?.isConnected)form.scrollTop=scroll;});}
    this.translateDom(this.shadowRoot);
    if(focusState?.path){
      const input=[...this.shadowRoot.querySelectorAll('[data-path]')].find(el=>el.dataset.path===focusState.path);
      input?.focus({preventScroll:true});
      if(input?.setSelectionRange&&focusState.start!=null)try{input.setSelectionRange(focusState.start,focusState.end);}catch{}
    }
    this.renderedEditor=ed;
  }
  loadProgramFolds(){
    const key='light-manager:folds:'+(this._hass?.user?.id||'local');
    if(this.foldKey===key)return;
    this.foldKey=key;
    let saved={};
    try{saved=JSON.parse(localStorage.getItem(key))||{};}catch{}
    this.expanded=new Set(Array.isArray(saved.programs)?saved.programs:[]);
    this.collapsedProgramGroups=new Set(Array.isArray(saved.groups)?saved.groups:[]);
    this.overviewOpen=saved.overview===true;
    this.sensorOverviewOpen=saved.sensorOverview===true;
  }
  saveProgramFolds(){
    try{localStorage.setItem(this.foldKey,JSON.stringify({programs:[...this.expanded],groups:[...this.collapsedProgramGroups],overview:this.overviewOpen,sensorOverview:this.sensorOverviewOpen}));}catch{}
  }
  overviewVisible(){this.loadProgramFolds();return this.tab==='sensors'?this.sensorOverviewOpen:this.overviewOpen;}
  readingKind(e){if(this.config.programs.some(p=>p.kind==='contact'&&p.actions.some(a=>a.sensors?.includes(e))))return 'contact';if(this.config.programs.some(p=>p.kind==='motion'&&p.actions.some(a=>a.sensors?.includes(e))))return 'motion';const entry=this.catalog.find(s=>s.entity===e)||{attributes:this._hass.states[e]?.attributes||{}};return this.isLux(entry)?'lux':'other';}
  readingValue(e,kind){const st=this._hass.states[e],v=st?.state;if(!st||v==='unavailable')return this.t('Nicht verfügbar');if(v==='unknown')return this.t('Unbekannt');if(kind==='contact'){const value=this.contactValue(e);return this.t(value===null?'Unbekannt':value?'Offen':'Geschlossen');}if(kind==='motion')return this.t(v==='on'?'Bewegung':v==='off'?'Keine Bewegung':'Unbekannt');const n=Number(v),unit=st.attributes.unit_of_measurement||(kind==='lux'?'lx':'');if(v!==''&&Number.isFinite(n)){const value=kind==='lux'&&unit==='klx'?n*1000:n;return new Intl.NumberFormat(this.language()==='en'?'en-GB':'de-DE',{maximumFractionDigits:kind==='lux'?0:2}).format(value)+(unit?' '+(kind==='lux'?'lx':unit):'');}return v+(unit?' '+unit:'');}
  readingIcon(kind){return uiIcon(({lux:'illuminance',motion:'sensors',other:'unknown'})[kind]||kind);}
  overviewContent(){const sensors=[...new Set(this.config.programs.flatMap(p=>p.actions.flatMap(a=>[...(a.sensors||[]),...(a.lux_entity?[a.lux_entity]:[])])))].sort((a,b)=>this.entityName(a).localeCompare(this.entityName(b)));
    return `${this.tab==='sensors'?'':`<div class="sun-row">${[['sunrise','Sonnenaufgang'],['sunset','Sonnenuntergang']].map(([event,label])=>`<span class="sun-value" title="${this.t(label)}" aria-label="${this.t(label)} ${this.time(this.data.sun[event])}">${this.icon(event)}<time>${this.time(this.data.sun[event])}</time></span>`).join('')}</div>`}${[['contact','Öffnungskontakte'],['motion','Bewegungsmelder'],['lux','Helligkeit'],['other','Weitere Sensoren']].map(([kind,label])=>{const entries=sensors.filter(e=>this.readingKind(e)===kind);return entries.length?`<section class="overview-group" aria-label="${this.t(label)}"><h4>${label}</h4><div class="sensor-grid">${entries.map(e=>{const text=this.readingValue(e,kind),value=kind==='contact'?this.contactValue(e):null,lock=value!==null;return `<div class="overview-item sensor-value"><span class="sensor-label">${this.user(this.entityName(e))}</span><span class="sensor-state" title="${lmEsc(text)}">${this.readingIcon(lock?(value?'unlock':'lock'):kind)}<span ${lock?'class="visually-hidden"':''}>${lmEsc(text)}</span></span></div>`;}).join('')}</div></section>`:'';}).join('')}`;
  }
  overview(){const open=this.overviewVisible();return `<div class="overview-panel">${this.btn('overview',this.chevron(open)+'<span>Messwerte</span>',`aria-expanded="${open}" aria-controls="lm-overview"`,'overview-toggle')}<section class="overview" id="lm-overview" aria-label="${this.tab==='sensors'?'Sensorwerte':'Sonnenzeiten und Sensorwerte'}" ${open?'':'hidden'}>${this.overviewContent()}</section></div>`;}
  programPage(){
    const programs=this.config.programs.filter(p=>!p.once_date&&(!this.vacationFilter||!p.pause_in_vacation));
    const groups=[
      ['time','Zeitprogramme',programs.filter(p=>p.kind==='time')],
      ['sensor','Sensorprogramme',programs.filter(p=>p.kind!=='time')]
    ];
    return `<div class="page-actions">${filterButton({label:this.language()==='en'?'Vacation':'Urlaub',action:'legacy',selected:!!this.vacationFilter}).replace('<button ','<button data-op="filter-vacation" ')}${this.btn('add','+ Programm','data-section="programs"','primary')}</div>
    ${!programs.length?this.empty(this.vacationFilter?(this.language()==='en'?'No vacation programs.':'Keine Programme für den Urlaub.'):'Noch keine Programme.',''):groups.filter(([, , items])=>items.length).map(([key,label,items])=>{
      const open=!this.collapsedProgramGroups?.has(key);
      return `<section class="program-group">${this.btn('fold-program-group',this.chevron(open)+`<strong>${this.t(label)}</strong><small>${items.length}</small>`,`data-group="${key}" aria-expanded="${open}"`,'program-group-head')}
      ${open?items.map((p,index)=>`<section class="program ${p.enabled?'':'disabled'}"><div class="program-head"><div class="program-heading">
      ${this.btn('expand',this.chevron(this.expanded.has(p.id))+`<span>${this.user(p.name)}</span>`,`data-id="${lmEsc(p.id)}" aria-expanded="${this.expanded.has(p.id)}"`,'program-title')}
      <div class="tags">
        <div><span>${[...p.days].sort((a,b)=>a-b).map(d=>this.t(LM_DAYS[d])).join(' · ')}</span>${p.kind==='time'?'':`<span>${p.start}–${p.end}</span>`}</div>
      </div></div>
      <div class="list-tools">${[[-1,'↑','Programm nach oben'],[1,'↓','Programm nach unten']].map(([delta,arrow,label])=>this.btn('move-program',arrow,`data-id="${lmEsc(p.id)}" data-delta="${delta}" title="${this.t(label)}" aria-label="${this.t(label)}" ${items[index+delta]?'':'disabled'}`,'icon')).join('')}${this.toggle(p.enabled,'Programm '+p.name+' aktivieren',`data-toggle="${lmEsc(p.id)}"`)}${this.btn('copy-program',this.icon('copy'),`data-id="${lmEsc(p.id)}" title="Programm kopieren" aria-label="Programm kopieren"`,'icon')}${this.editBtn('programs',p.id)}</div></div>
      ${this.expanded.has(p.id)?`<div class="actions">${p.actions.map(a=>`<div class="action ${a.enabled?'':'disabled'}"><div class="action-info"><strong>${this.user(a.name?.trim()||this.targetNames(a))}</strong><span>${lmEsc(this.when(a,p.kind))}</span><small>${lmEsc(this.actionText(a))}</small></div>${this.toggle(a.enabled,'Aktion '+this.targetNames(a)+' aktivieren',`data-action-toggle="${lmEsc(a.id)}" data-program="${lmEsc(p.id)}"`)}</div>`).join('')}</div>`:''}</section>`).join(''):''}</section>`;
    }).join('')}`;
  }
  dateHeading(){return this.data.today?new Intl.DateTimeFormat(this.language()==='en'?'en-GB':'de-DE',{weekday:'long',day:'2-digit',month:'2-digit',timeZone:this.data.timezone||'Europe/Berlin'}).format(new Date(this.data.today+'T12:00:00Z')):this.t('Heute');}
  timePage(){const completed=new Set(this.data.completed_once||[]),now=Date.now(),rows=this.data.planned.filter(row=>{
    const due=Date.parse(row.due);
    const once=this.config.programs.find(p=>p.id===row.program)?.once_date;
    return !completed.has(row.action)&&(once||!Number.isFinite(due)||due>=now);
  });for(const p of this.config.programs.filter(p=>p.once_date===this.data.today))for(const a of p.actions)if(!completed.has(a.id)&&!rows.some(row=>row.program===p.id&&row.action===a.id))rows.push({program:p.id,action:a.id,once_time:a.time,skipped:a.skips.includes(this.data.today)});rows.sort((a,b)=>(a.once_time||this.time(a.due)).localeCompare(b.once_time||this.time(b.due)));return `<div class="planned-heading toolbar time-heading"><h3>${lmEsc(this.dateHeading())}</h3>${this.btn('once','+ Zusätzliche Aktion')}</div>${rows.length?rows.map(row=>{const p=this.config.programs.find(p=>p.id===row.program),a=p?.actions.find(a=>a.id===row.action);return !a?'':`<section class="planned-row ${row.skipped?'skipped':''}" data-time-action="${lmEsc(a.id)}" ${p.once_date?`data-once-program="${lmEsc(p.id)}"`:''}><time class="planned-time" datetime="${lmEsc(row.due||'')}">${lmEsc(row.once_time||this.time(row.due))}</time><div class="planned-cover"><div class="planned-target"><strong>${this.user(p.once_date?(a.name?.trim()||this.targetNames(a)):[p.name,a.name?.trim()].filter(Boolean).join(' - '))}</strong><span class="planned-position">${this.t(a.mode==='off'?'Ausschalten':'Einschalten')}</span></div></div><div class="planned-action list-tools">${p.once_date?this.editBtn('programs',p.id)+this.removeBtn('programs',p.id):''}${this.btn('skip',row.skipped?'Wieder einplanen':'Auslassen',`data-program="${lmEsc(p.id)}" data-id="${lmEsc(a.id)}"`,row.skipped?'':'primary')}</div></section>`;}).join(''):this.empty('Heute keine Schaltzeiten.','')}`;}
  sensorPage(){const rows=this.config.programs.filter(p=>p.kind!=='time').map(p=>({p,rules:this.data.rules.filter(r=>r.program===p.id)})).filter(x=>x.rules.length);return `<div class="planned-heading"><h3>${lmEsc(this.dateHeading())}</h3></div>${rows.length?rows.map(({p,rules})=>{const paused=p.paused_on===this.data.today,active=rules.some(r=>r.eligible&&!r.blocked_reasons?.length),reasons=[...new Set(rules.flatMap(r=>r.blocked_reasons||[]))],status=active?this.t('Aktiv'):this.t('Nicht aktiv')+(reasons.length?' - '+reasons.map(reason=>this.t(reason)).join(', '):'');return `<section class="sensor-row ${p.enabled&&!paused?'':'sensor-paused'}" data-sensor-program="${lmEsc(p.id)}"><div class="sensor-summary"><strong>${this.user(p.name)}</strong><small>${this.t(LM_KINDS[p.kind])} · ${p.start}–${p.end}</small><span class="plan-status">${lmEsc(status)}</span></div><div class="sensor-action list-tools">${p.enabled?this.btn('pause-sensor',paused?'Heute wieder aktivieren':'Bis morgen aussetzen',`data-id="${lmEsc(p.id)}"`,paused?'':'primary'):''}</div></section>`;}).join(''):this.empty('Keine Sensorprogramme.','')}${this.warningList(new Set(this.config.programs.filter(p=>p.once_date).map(p=>p.name+': keine Lampen zugeordnet.')))}`;}
  warningList(hidden=new Set()){return this.data.warnings.filter(w=>!hidden.has(w)).map(w=>`<div class="alert" role="status">${lmEsc(this.message(w))}</div>`).join('');}
  historyMessage(message){
    return this.message(message).replace(/^(light\.[a-z0-9_]+(?:, light\.[a-z0-9_]+)*)(?= → |: )/,targets=>
      targets.split(', ').map(entity=>{
        const name=this.entityName(entity);
        if(name!==entity)return name;
        const label=entity.slice('light.'.length).replaceAll('_',' ');
        return label.charAt(0).toLocaleUpperCase(this.language())+label.slice(1);
      }).join(', '));
  }
  statusPage(){return `${this.warningList()}
    ${Object.keys(this.data.status).length?Object.entries(this.data.status).sort(([a],[b])=>this.entityName(a).localeCompare(this.entityName(b))).map(([e,s])=>`<div class="setting-row"><div class="row-text"><strong>${this.user(this.entityName(e))}</strong><p>${this.user(s.kind==='fallback'?this.t('Rückfallverhalten'):s.program)} · ${lmEsc(this.t(LM_KINDS[s.kind]||'Rückfallverhalten'))}</p></div><span class="tag on">${lmEsc(s.mode==='scene'?'Szene':s.mode==='on'?'Ein':'Aus')}</span></div>`).join(''):this.empty('Kein aktives Programm.','')}`;}
  dailyHistory(){
    const rows=[...(this.data.daily_history||[])].sort((a,b)=>a.time.localeCompare(b.time));
    if(!rows.length)return `<p class="version-info">${this.language()==='en'?'No switching commands executed today.':'Heute wurden noch keine Schaltungen ausgeführt.'}</p>`;
    return `<div class="daily-history" role="list">${rows.map(row=>{
      const label=this.language()==='en'?(row.error?'Failed':'Completed'):(row.error?'Fehlgeschlagen':'Erfolgreich');
      const time=new Date(row.time).toLocaleTimeString(this.language(),{hour:'2-digit',minute:'2-digit',timeZone:this.data.timezone});
      return `<div class="daily-history-row ${row.error?'failed':'completed'}" role="listitem"><time datetime="${lmEsc(row.time)}">${lmEsc(time)}</time><div class="daily-command"><strong>${this.user((row.entities||[]).map(e=>this.entityName(e)).join(', '))}</strong><small>${lmEsc(this.actionText(row.action))}</small>${row.error?`<small class="failure-reason">${lmEsc(this.historyMessage(row.message))}</small>`:''}</div><span class="command-result">${this.icon(row.error?'failure':'success')}${label}</span></div>`;
    }).join('')}</div>`;
  }
  settings(){const c=this.config;
    const section=(id,title,content,trailing='')=>uiSection({id:'lm-settings-'+id,title,content,trailing,expanded:this.settingsOpen.has(id)}).replace('data-settings="lm-settings-','data-settings="');
    return `<section class="settings-group"><div class="settings-heading-row"><h3>${this.t('Sprache')}</h3><div class="language-picker">${this.btn('language','DE',`data-language="de" aria-pressed="${this.language()==='de'}" title="Deutsch"`)}${this.btn('language','EN',`data-language="en" aria-pressed="${this.language()==='en'}" title="English"`)}</div></div></section>
      <section class="settings-group"><div class="settings-heading-row"><h3>${this.t('Urlaubsmodus')}</h3>${this.toggle(c.vacation,this.t('Urlaubsmodus'),'data-vacation')}</div></section>
      ${section('lamps',this.t('Lampen'),this.lampSettings(),this.btn('select-lamps',this.t('Lampen auswählen'),'','primary'))}
      ${section('sensors',this.t('Sensoren'),c.sensors.map(v=>uiRow({title:this.entityName(v.entity),description:this.readingValue(v.entity,this.readingKind(v.entity)),trailing:this.editBtn('sensors',v.entity)}).replace('<strong>','<strong data-user-content>')).join('')||notice(this.t('Keine Einträge.')),this.btn('select-sensors',this.t('Sensoren auswählen'),'','primary'))}
      ${section('status',this.t('Lampenstatus'),this.statusPage())}
      ${section('daily-history',this.language()==='en'?"Today's switching commands":'Heutige Schaltungen',this.dailyHistory())}
      <section class="settings-group"><h3>${this.t('Sicherung')}</h3><div class="toolbar backup-actions">${this.btn('export',this.t('Sicherung erstellen'))}${this.btn('import',this.t('Sicherung wiederherstellen'))}</div><input type="file" id="lm-backup" accept="application/json,.json" hidden></section>
      ${versionInfo({frontend:LM_VERSION,backend:this.data.version,ui:UI_VERSION,label:this.t('Oberfläche'),backendLabel:this.t('Integration')})}`;
  }
  value(path){return path.split('.').reduce((v,k)=>v?.[k],this.editor.value);}
  field(label,path,type='text',opts={}){
    const id='lm-field-'+path.replaceAll('.','-');
    let html=uiField({id,label,value:this.value(path)??'',type});
    html=html.replace('<input ',`<input data-path="${path}" ${opts.min!=null?'min="'+opts.min+'"':''} ${opts.max!=null?'max="'+opts.max+'"':''} ${type==='number'?'step="any"':''} ${opts.placeholder?'placeholder="'+lmEsc(opts.placeholder)+'"':''} `);
    if(opts.wide)html=html.replace('class="field"','class="field full"');
    return html.replace('</label>',(opts.help?'<small>'+opts.help+'</small>':'')+'</label>');
  }
  select(label,path,options,rerender=false){
    const value=path.endsWith('.mode')&&this.value(path)==='scene'?'on':this.value(path);
    return selectField({id:'lm-field-'+path.replaceAll('.','-'),label,value,options:options.map(([value,label])=>({value,label}))}).replaceAll('<option value=',(path==='entity'||path.endsWith('lux_entity')||path.endsWith('.scene'))?'<option data-user-content value=':'<option value=').replace('<select ',`<select data-path="${path}" ${rerender?'data-redraw':''} `);
  }
  check(label,path){return `<label class="switch"><input type="checkbox" data-path="${path}" ${this.value(path)?'checked':''}><span>${label}</span></label>`;}
  choices(label,path,items){const values=this.value(path)||[],scenes=path==='scenes';return `<div class="field full ${path==='days'?'days-field':''}"><span>${label}</span><div class="choices ${scenes?'scene-choices':path==='days'?'days':items.length>7?'stack':''}">${items.length?items.map(x=>`<label><input type="checkbox" data-array="${path}" value="${lmEsc(x.id)}" ${values.includes(x.id)?'checked':''}><span ${path==='days'?'':'data-user-content'} ${scenes?'class="entity-label"':''}>${scenes?`<strong>${lmEsc(x.name)}</strong><small class="technical-id">${lmEsc(x.id)}</small>`:lmEsc(x.label||x.name)}</span></label>`).join(''):'<small>Noch keine passenden Einträge vorhanden.</small>'}</div></div>`;}
  lightList(items,selected,attribute,technical=true){
    const chosen=new Set(selected),sort=(a,b)=>a.name.localeCompare(b.name,this.language(),{sensitivity:'base',numeric:true})||a.id.localeCompare(b.id);
    const rows=items.slice().sort(sort),row=x=>`<label data-lamp-row="${lmEsc((x.id+' '+x.name).toLowerCase())}" data-light-name="${lmEsc(x.name)}"><input type="checkbox" ${attribute} value="${lmEsc(x.id)}" ${chosen.has(x.id)?'checked':''}><span class="entity-label" data-user-content><strong>${lmEsc(x.name)}</strong>${technical?`<small class="technical-id">${lmEsc(x.id)}</small>`:''}</span></label>`;
    return `<div class="choices stack lamp-selection ${technical?'lamp-table':'lamp-assignment'}" data-light-list>${rows.filter(x=>chosen.has(x.id)).map(row).join('')}<hr class="light-selection-divider" data-light-divider ${!rows.some(x=>chosen.has(x.id))||!rows.some(x=>!chosen.has(x.id))?'hidden':''}>${rows.filter(x=>!chosen.has(x.id)).map(row).join('')}${rows.length?'':'<small>Noch keine passenden Einträge vorhanden.</small>'}</div>`;
  }
  updateLightList(list){
    if(!list)return;const active=this.shadowRoot.activeElement,scroll=list.scrollTop,rows=[...list.querySelectorAll('[data-lamp-row]')],divider=list.querySelector('[data-light-divider]');
    rows.sort((a,b)=>Number(b.querySelector('input').checked)-Number(a.querySelector('input').checked)||a.dataset.lightName.localeCompare(b.dataset.lightName,this.language(),{sensitivity:'base',numeric:true})||a.querySelector('input').value.localeCompare(b.querySelector('input').value));
    for(const row of rows.filter(r=>r.querySelector('input').checked))list.append(row);list.append(divider);for(const row of rows.filter(r=>!r.querySelector('input').checked))list.append(row);
    this.filterLightRows(list);if(active&&list.contains(active))active.focus({preventScroll:true});list.scrollTop=scroll;
  }
  filterLightRows(list){const search=(this.shadowRoot.querySelector('[data-lamp-search]')?.value||'').trim().toLowerCase(),rows=[...list.querySelectorAll('[data-lamp-row]')];for(const row of rows)row.hidden=!row.dataset.lampRow.includes(search);const divider=list.querySelector('[data-light-divider]');if(divider)divider.hidden=!rows.some(r=>!r.hidden&&r.querySelector('input').checked)||!rows.some(r=>!r.hidden&&!r.querySelector('input').checked);}
  dialog(){const ed=this.editor,section=ed.section,v=ed.value,picker=['lamp_selection','sensor_selection'].includes(section);let content='';const title={lamps:'Lampe',sensors:'Sensor',rooms:'Zimmer',zones:'Zone',programs:'Programm',lamp_selection:'Lampen auswählen',sensor_selection:'Sensoren auswählen'}[section];
    if(picker){
      const lamps=section==='lamp_selection',saved=lamps?this.config.lamps:this.config.sensors;
      const entities=[...new Set([...this.catalog.filter(x=>lamps?x.entity.startsWith('light.'):x.entity.startsWith('binary_sensor.')||x.entity.startsWith('sensor.')).map(x=>x.entity),...saved.map(l=>l.entity)])].sort();
      const items=entities.map(id=>({id,name:this.catalog.find(x=>x.entity===id)?.name||saved.find(x=>x.entity===id)?.name||id}));
      content=`<label class="field full"><span>Suchen</span><input type="search" data-lamp-search aria-label="${lamps?'Lichtentität suchen':'Sensor suchen'}"></label><div class="field full">${lamps?this.lightList(items,v.entities,'data-array="entities"'):`<div class="choices stack lamp-selection">${items.map(x=>`<label data-lamp-row="${lmEsc((x.id+' '+x.name).toLowerCase())}"><input type="checkbox" data-array="entities" value="${lmEsc(x.id)}" ${v.entities.includes(x.id)?'checked':''}><span class="entity-label" data-user-content><strong>${lmEsc(x.name)}</strong><small class="technical-id">${lmEsc(x.id)}</small></span></label>`).join('')||'<small>Noch keine passenden Einträge vorhanden.</small>'}</div>`}</div>`;
    }else{
      if(section==='lamps')content=`<div class="field full"><span>Licht-Entität</span><span data-user-content class="technical-id">${lmEsc(v.entity)}</span></div>`;
      if(section==='sensors')content=`<div class="field full"><span>Sensor-Entität</span><span data-user-content class="technical-id">${lmEsc(v.entity)}</span></div>`;
      content+=this.field('Anzeigename','name','text',{wide:section!=='lamps'});
      if(section==='lamps'){content+=this.select('Wenn keine Regel mehr gilt','fallback',[['off','Ausschalten'],['keep','Zustand beibehalten'],['restore','Vorherigen Zustand wiederherstellen']]);content+=`<div class="field"><span>Bereich</span>${this.user(this.lampAreaName(v.entity))}</div>`;}
      if(section==='sensors'){const record=this.catalog.find(s=>s.entity===v.entity)||{attributes:{}};if((!this.isLux(record)&&!['motion','occupancy','presence'].includes(record.attributes.device_class))||v.open_states){const binary=v.entity.startsWith('binary_sensor.');ed.contactInputs??={open_states:(v.open_states||(binary?['on']:[])).join(', '),closed_states:(v.closed_states||(binary?['off']:[])).join(', ')};content+=`<div class="field full"><span>Aktueller Zustand</span>${this.user(this._hass.states[v.entity]?.state||this.t('Nicht verfügbar'))}${Array.isArray(record.attributes.options)&&record.attributes.options.length?`<small><span>Mögliche Zustände</span>: ${this.user(record.attributes.options.join(', '))}</small>`:''}</div>`+[['open_states','Offen-Zustände'],['closed_states','Geschlossen-Zustände']].map(([key,label])=>`<label class="field"><span>${label}</span><input type="text" data-contact-states="${key}" value="${lmEsc(ed.contactInputs[key])}" autocomplete="off"><small>Mehrere Werte durch Komma trennen.</small></label>`).join('');}}
      if(['rooms','zones'].includes(section))content+=`<div class="full target-choices"><details data-lamp-section="assignment" ${ed.lampSections.assignment?'open':''}><summary>Lampen <small data-assignment-count>${ed.lampIds.length} / ${this.config.lamps.length}</small></summary><div class="field">${this.lightList(this.config.lamps,ed.lampIds,'data-assign-light',false)}</div></details></div>`;
      if(section==='programs')content=this.programEditor();
    }
    return uiDialog({id:'lm-editor',title:picker?this.t(title):this.t(title+' bearbeiten'),content:`<div class="grid">${content}</div>`,closeLabel:this.t('Schließen'),actions:`${this.error?notice(this.message(this.error),{error:true}):''}${section==='programs'&&this.config.programs.some(p=>p.id===v.id)?this.removeBtn('programs',v.id):''}${this.btn('cancel',this.t('Abbrechen'))}${this.btn('commit',this.busy?this.t('Speichern …'):this.t('Speichern'),'','primary')}`}).replace('class="modal-body"','class="modal-body form"');

  }
  initProgramTargets(){
    const p=this.editor.value, first=p.actions[0]?.targets||[];
    this.editor.mixedProgramTargets=p.actions.some(a=>a.targets.length!==first.length||a.targets.some(id=>!first.includes(id)));
    p.targets=this.editor.mixedProgramTargets?[]:[...(p.targets||first)];
  }
  programTargetPicker(p){
    return `<div class="full"><h3>Lampen und Bereiche für alle Schaltaktionen</h3>
      ${this.editor.mixedProgramTargets?`<div class="alert">${this.t('Dieses Programm hat bisher unterschiedliche Schaltziele. Bitte gemeinsame Ziele für alle Aktionen auswählen.')}</div>`:''}
      ${this.targetChoices({id:p.id,targets:p.targets},'targets')}</div>`;
  }
  updateActionTargets(action,targets){
    action.targets=[...targets];
    if(action.mode==='scene'&&!this.availableScenes(action).some(scene=>scene.id===action.scene)){
      action.mode='on';
      delete action.scene;
    }else if(this.colourMode(action)==='white'){
      const range=this.whiteRange(action);
      if(range.valid)action.kelvin=Math.max(range.min,Math.min(range.max,action.kelvin));
    }
  }
  programEditor(){const p=this.editor.value;if(p.once_date)return this.field('Name','name')+`<div class="field"><span>Einmalige Schaltung</span>${lmEsc(p.once_date)}</div>${this.programTargetPicker(p)}<div class="full">${p.actions.map((a,i)=>this.actionEditor(a,i,'time')).join('')}</div>`;return this.field('Name','name')+this.select('Programmtyp','kind',Object.entries(LM_KINDS),true)+
    this.check('Programm aktiv','enabled')+this.check('Im Urlaub aussetzen','pause_in_vacation')+
    this.choices('Wochentage','days',LM_DAYS.map((name,id)=>({id,name})))+
    (p.kind==='time'?'':this.field('Gültig ab','start','time')+this.field('Gültig bis','end','time',{help:'Gleiche Uhrzeit = ganztägig.'}))+
    this.programTargetPicker(p)+
    `<div class="full season-box"><label class="switch"><input type="checkbox" data-path="season_enabled" data-redraw ${p.season_enabled?'checked':''}><span>Saison einschränken</span></label>${p.season_enabled?`<div class="season-dates">${this.seasonField('Von','season_from')}${this.seasonField('Bis','season_to')}</div>`:''}</div>
    <div class="full"><div class="toolbar"><h3 class="actions-heading">Schaltaktionen</h3>${p.actions.length>1?this.btn('expand-actions','Alle aufklappen')+this.btn('collapse-actions','Alle zuklappen'):''}</div>${p.actions.map((a,i)=>this.actionEditor(a,i,p.kind)).join('')}${this.btn('add-action','+ Schaltaktion hinzufügen')}</div>`;
  }
  seasonField(label,key){this.editor.seasonInputs??={};const stored=this.editor.value[key]||'',value=this.editor.seasonInputs[key]??(stored?stored.slice(3,5)+'.'+stored.slice(0,2):'');
    return `<label class="field"><span>${label}</span><input type="text" data-season="${key}" value="${lmEsc(value)}" placeholder="TT.MM." maxlength="5" inputmode="decimal" aria-label="${label} (TT.MM.)"></label>`;}
  parseSeason(value){const match=String(value).match(/^(\d{2})\.(\d{2})\.?$/);if(!match)throw Error(this.t('Saison bitte als TT.MM. eingeben.'));
    const day=Number(match[1]),month=Number(match[2]),d=new Date(Date.UTC(2000,month-1,day));if(d.getUTCMonth()!==month-1||d.getUTCDate()!==day)throw Error(this.t('Ungültiges Saisondatum.'));
    return match[2]+'-'+match[1];}
  brightnessControl(a,i){return `<div class="field brightness-control"><span>Helligkeit</span><label class="switch"><input type="checkbox" data-brightness-keep="${i}" ${a.brightness==null?'checked':''}><span>Letzte Einstellung</span></label><div class="brightness-row"><input type="range" data-brightness="${i}" min="1" max="100" step="1" value="${a.brightness??100}" ${a.brightness==null?'disabled':''} aria-label="Helligkeit in Prozent"><output data-brightness-value="${i}">${a.brightness==null?'—':a.brightness+' %'}</output></div></div>`;}

  sceneMatches(lamp,entity){const prefix='scene.'+lamp.entity.slice('light.'.length)+'_';return entity.startsWith(prefix)&&entity.length>prefix.length;}
  sceneName(entity,lamp=null){
    const raw=this.catalog.find(x=>x.entity===entity)?.name||this._hass.states[entity]?.attributes?.friendly_name||entity||this.t('Bitte wählen');
    const matched=(lamp?[lamp]:this.config.lamps).filter(l=>this.sceneMatches(l,entity||'')).sort((a,b)=>b.entity.length-a.entity.length)[0];
    if(!matched)return raw;
    const suffix=entity.slice(('scene.'+matched.entity.slice(6)+'_').length),normal=text=>text.normalize('NFKD').replace(/\p{M}/gu,'').replace(/ß/g,'ss').toLowerCase().replace(/[^a-z0-9]/g,'');
    // Prefer original spelling/capitalization of the scene suffix over a generated label.
    if(raw!==entity){const words=raw.trim().split(/\s+/);for(let i=0;i<words.length;i++){const tail=words.slice(i).join(' ');if(normal(tail)===normal(suffix))return tail;}
      const names=[this._hass.states[matched.entity]?.attributes?.friendly_name,this.catalog.find(x=>x.entity===matched.entity)?.name,matched.name].filter(Boolean).sort((a,b)=>b.length-a.length);
      for(const name of names)if(raw.toLowerCase().startsWith(name.toLowerCase())&&/^[\s·:–-]/.test(raw.slice(name.length))){const short=raw.slice(name.length).replace(/^[\s·:–-]+/,'');if(short)return short;}
      return raw;
    }
    const label=suffix.replace(/_/g,' ');return label.charAt(0).toUpperCase()+label.slice(1);
  }
  applyScenePrefix(lamp){return lamp;}
  syncSceneOptions(){
    if(this.editor?.section!=='programs')return;
    for(const select of this.shadowRoot.querySelectorAll('[data-colormode]')){
      const action=this.editor.value.actions[Number(select.dataset.colormode)],scenes=this.availableScenes(action);
      const html=scenes.map(scene=>`<option data-user-content value="${lmEsc(scene.id)}">${lmEsc(scene.name)}</option>`).join('');
      let group=select.querySelector('optgroup');
      if(!group&&scenes.length){group=document.createElement('optgroup');group.label=this.t('Hue-Szenen');select.append(group);}
      if(group&&group.innerHTML!==html)group.innerHTML=html;
      if(group&&!scenes.length)group.remove();
      select.querySelector('[data-missing-scene]')?.remove();
      if(action.mode==='scene'&&!scenes.some(scene=>scene.id===action.scene)){
        const option=document.createElement('option');option.dataset.missingScene='';option.value=action.scene;option.textContent=this.t('Nicht verfügbar');option.disabled=true;select.append(option);
      }
      select.value=action.mode==='scene'?action.scene:this.colourMode(action);
    }
  }
  availableScenes(a){const lamps=this.actionLampIds(a).map(id=>this.config.lamps.find(l=>l.id===id));return lamps.length?this.catalog.filter(s=>s.entity.startsWith('scene.')&&lamps.every(l=>this.sceneMatches(l,s.entity))).map(s=>({id:s.entity,name:this.sceneName(s.entity)})).sort((a,b)=>a.name.localeCompare(b.name)):[];}
  colourMode(a){if(a.mode==='scene')return 'scene';return a.kelvin!=null?'white':a.rgb?'color':'last';}
  targetChoices(a,path){
    const groups=this.lampAreaGroups(a);
    return `<div class="full target-choices">${groups.map(group=>{
      const key=a.id+':'+group.id;
      const items=group.id?[{id:group.id,name:group.lamps.length?this.t('Ganzer Bereich'):group.name},...group.lamps]:group.lamps;
      const chosen=items.filter(item=>a.targets.includes(item.id)).length;
      return `<details data-target-group="${lmEsc(key)}" ${this.editor.targetGroups?.[key]?'open':''}><summary><span data-user-content>${lmEsc(group.name)}</span> <small>${chosen} / ${items.length}</small></summary>${this.choices('',path,items)}</details>`;
    }).join('')||this.t('Keine Einträge.')}</div>`;
  }
  wheelHSV(rgb){const [r,g,b]=rgb.map(v=>v/255),max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min;let h=0;if(d)h=(max===r?(g-b)/d+(g<b?6:0):max===g?(b-r)/d+2:(r-g)/d+4)*60;return {h,s:max?d/max:0};}
  wheelRGB(h,s){const c=s,x=c*(1-Math.abs((h/60)%2-1)),m=1-c,parts=h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x];return parts.map(v=>Math.round((v+m)*255));}
  wheelHex(rgb){return '#'+rgb.map(v=>Math.round(v).toString(16).padStart(2,'0')).join('');}
  colourWheel(a,i){const {h,s}=this.wheelHSV(a.rgb),angle=h*Math.PI/180,hex=this.wheelHex(a.rgb);return `<div class="field full colour-control"><span>Farbe</span><div class="colour-wheel" data-wheel="${i}" tabindex="0" role="group" aria-label="${this.t('Farbkreis: Pfeiltasten zum Wählen, Pos1 für Weiß.')}" aria-describedby="wheel-value-${i}"><span class="colour-marker" style="left:${50+Math.sin(angle)*s*50}%;top:${50-Math.cos(angle)*s*50}%;background:${hex}"></span></div><div class="colour-preview"><span data-colour-swatch="${i}" style="background:${hex}"></span><output data-user-content id="wheel-value-${i}" data-colour-value="${i}" aria-live="polite">${hex.toUpperCase()}</output></div></div>`;}
  setWheel(wheel,x,y){const radius=Math.hypot(x,y);if(radius>1){x/=radius;y/=radius;}const h=(Math.atan2(x,-y)*180/Math.PI+360)%360,s=Math.min(1,radius),i=Number(wheel.dataset.wheel),rgb=this.wheelRGB(h,s),hex=this.wheelHex(rgb);this.editor.value.actions[i].rgb=rgb;const marker=wheel.querySelector('.colour-marker');Object.assign(marker.style,{left:(50+x*50)+'%',top:(50+y*50)+'%',background:hex});this.shadowRoot.querySelector(`[data-colour-swatch="${i}"]`).style.background=hex;this.shadowRoot.querySelector(`[data-colour-value="${i}"]`).textContent=hex.toUpperCase();}
  wheelPointer(e){const wheel=e.target.closest?.('[data-wheel]');if(!wheel||!this.editor||this.busy||e.isPrimary===false||(e.type==='pointerdown'&&e.button!==0))return;if(e.type==='pointerdown'){wheel.setPointerCapture(e.pointerId);wheel.focus({preventScroll:true});}e.preventDefault();const r=wheel.getBoundingClientRect();this.setWheel(wheel,(e.clientX-r.left-r.width/2)/(r.width/2),(e.clientY-r.top-r.height/2)/(r.height/2));}
  wheelKey(e){const wheel=e.target.closest?.('[data-wheel]');if(!wheel||!this.editor||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(e.key))return;e.preventDefault();const {h,s}=this.wheelHSV(this.editor.value.actions[Number(wheel.dataset.wheel)].rgb),a=h*Math.PI/180,step=e.shiftKey?.1:.02;let x=Math.sin(a)*s,y=-Math.cos(a)*s;if(e.key==='Home'){x=0;y=0;}else if(e.key==='End'){x=Math.sin(a);y=-Math.cos(a);}else if(e.key==='ArrowLeft')x-=step;else if(e.key==='ArrowRight')x+=step;else if(e.key==='ArrowUp')y-=step;else y+=step;this.setWheel(wheel,x,y);}
  actionLampIds(a){const ids=new Set();for(const id of a.targets||[]){if(id.startsWith('area:'))this.config.lamps.filter(l=>this.data.lamp_areas?.[l.entity]===id).forEach(l=>ids.add(l.id));if(this.config.lamps.some(l=>l.id===id))ids.add(id);for(const section of ['rooms','zones'])if(this.config[section].some(v=>v.id===id))this.config.lamps.filter(l=>(l[section]||[]).includes(id)).forEach(l=>ids.add(l.id));}return [...ids];}
  actionEntities(a){const result=new Set();const walk=(entity,seen=new Set())=>{if(seen.has(entity))return;const l=this.config.lamps.find(l=>l.entity===entity),attrs=this.catalog.find(x=>x.entity===entity)?.attributes||this._hass.states[entity]?.attributes||{};let native=attrs.entity_id||[];if(typeof native==='string')native=[native];const members=Array.isArray(native)&&native.length?native:l?.members;if(Array.isArray(members)&&members.length)members.filter(x=>x.startsWith('light.')).forEach(x=>walk(x,new Set([...seen,entity])));else result.add(entity);};this.actionLampIds(a).forEach(id=>walk(this.config.lamps.find(l=>l.id===id).entity));return [...result];}
  emptyTargetReason(a){if(!(a.targets||[]).length)return this.t('Zuerst Bereiche oder Lampen auswählen.');if(a.targets.some(id=>id.startsWith('area:')))return this.t('Die Auswahl enthält keine Lampen.');const rooms=this.config.rooms.some(r=>a.targets.includes(r.id)),zones=this.config.zones.some(z=>a.targets.includes(z.id));return rooms&&zones?'Den ausgewählten Zonen und Zimmern sind keine Lampen zugeordnet.':rooms?'Dem ausgewählten Zimmer sind keine Lampen zugeordnet.':zones?'Der ausgewählten Zone sind keine Lampen zugeordnet.':'Die Auswahl enthält keine Lampen.';}
  whiteRange(a){const entities=this.actionEntities(a);let min=1000,max=10000;
    if(!entities.length)return {min:2000,max:6500,valid:false,reason:this.emptyTargetReason(a)};
    for(const e of entities){const attrs=this.catalog.find(x=>x.entity===e)?.attributes||this._hass.states[e]?.attributes||{};
      if(!attrs.supported_color_modes?.includes('color_temp'))return {min:2000,max:6500,valid:false,reason:'Die Auswahl unterstützt keine gemeinsamen Weißtöne.'};
      const low=Number(attrs.min_color_temp_kelvin??2000),high=Number(attrs.max_color_temp_kelvin??6500);
      if(!Number.isFinite(low)||!Number.isFinite(high)||low>high)return {min:2000,max:6500,valid:false,reason:'Kein gültiger Kelvin-Bereich verfügbar.'};
      min=Math.max(min,Math.ceil(low));max=Math.min(max,Math.floor(high));}
    return min<=max?{min,max,valid:true}:{min:2000,max:6500,valid:false,reason:'Die Auswahl unterstützt keine gemeinsamen Weißtöne.'};}
  whiteControl(a,i){const r=this.whiteRange(a),within=r.valid&&a.kelvin>=r.min&&a.kelvin<=r.max;
    return `<div class="field full white-control"><span>Weißtöne</span><div class="white-labels"><span>Kaltweiß</span><output data-white-value="${i}">${a.kelvin} K</output><span>Warmweiß</span></div><input type="range" data-white="${i}" data-max-kelvin="${r.max}" data-min-kelvin="${r.min}" min="0" max="${r.max-r.min}" step="1" value="${r.max-Math.max(r.min,Math.min(r.max,a.kelvin))}" ${r.valid?'':'disabled'} aria-label="Weißtöne von Kaltweiß nach Warmweiß"><div class="white-labels muted"><span>${r.max} K</span><span>${r.min} K</span></div>${!r.valid?`<small>${this.t(r.reason)}</small>`:!within?'<small>Gespeicherter Weißton liegt außerhalb des Lampenbereichs. Regler neu einstellen.</small>':''}</div>`;}
  actionEditor(a,i,kind){const q='actions.'+i+'.',available=this.selectedSensors(),bins=available.filter(x=>x.entity.startsWith('binary_sensor.')||(kind==='contact'&&(!this.isLux(x)||x.open_states)));
    let body=this.field('Name der Schaltaktion',q+'name','text',{wide:true})+this.select('Lichtaktion',q+'mode',[['on','Einschalten / Lichtwerte'],['off','Ausschalten']],true);
    if(a.mode==='on'||a.mode==='scene'){
      const color=this.colourMode(a);
      if(a.mode==='on')body+=this.brightnessControl(a,i);
      body+=`<label class="field"><span>Farbe</span><select data-colormode="${i}"><option value="last" ${color==='last'?'selected':''}>Letzte Einstellung</option><option value="white" ${color==='white'?'selected':''}>Weißtöne</option><option value="color" ${color==='color'?'selected':''}>Farbe</option>${this.availableScenes(a).length?`<optgroup label="Hue-Szenen">${this.availableScenes(a).map(s=>`<option data-user-content value="${lmEsc(s.id)}" ${a.scene===s.id&&a.mode==='scene'?'selected':''}>${lmEsc(s.name)}</option>`).join('')}</optgroup>`:''}</select></label>`;
      if(a.mode==='scene'&&!this.availableScenes(a).some(s=>s.id===a.scene))body+='<small class="full">Hue-Szene passt nicht zur Auswahl. Bitte neu wählen.</small>';
      if(color==='white')body+=this.whiteControl(a,i);
      if(color==='color')body+=this.colourWheel(a,i);
      body+='';
    }
    if(kind==='time'){
      const triggers = [['fixed', 'Uhrzeit']];
      if (!this.editor.value.once_date) triggers.push(['sunrise', 'Sonnenaufgang'], ['sunset', 'Sonnenuntergang']);
      const timeField = a.event === 'fixed'
        ? this.field('Uhrzeit', q+'time', 'time')
        : this.field('Versatz (Minuten)', q+'offset', 'number', {min:-720,max:720});
      body += '<div class="full schedule-fields">'
        + this.select('Auslöser', q+'event', triggers, true)
        + timeField
        + this.field('Frühestens', q+'earliest', 'time')
        + this.field('Spätestens', q+'latest', 'time')
        + '</div>';
    }else{
      if(kind!=='lux'){
        const allowed=kind==='motion'?['motion','occupancy','presence']:['opening','door','window','garage_door'];
        body+=this.choices(kind==='motion'?'Bewegungs- / Präsenzsensoren':'Öffnungskontakte',q+'sensors',bins.filter(x=>x.entity.startsWith('sensor.')||!x.attributes.device_class||allowed.includes(x.attributes.device_class)||a.sensors.includes(x.entity)).map(x=>({id:x.entity,name:x.name})));
        if(kind==='contact'&&a.sensors.some(e=>e.startsWith('sensor.')&&!available.find(s=>s.entity===e)?.open_states))body+='<small class="full">Offen- und Geschlossen-Zustände zuerst in den Einstellungen festlegen.</small>';
        body+=this.field(kind==='motion'?'Nachlauf ohne Bewegung (Sekunden)':'Freigabe nach Schließen (Sekunden)',q+'delay','number',{min:0,max:86400});
      }
      if(kind==='lux'||kind==='motion'){
        body+=this.select(kind==='lux'?'Helligkeitssensor':'Nur bei Dunkelheit (optional)',q+'lux_entity',[[ '',kind==='lux'?'Bitte wählen':'Keine Lux-Bedingung'],...available.filter(x=>x.entity.startsWith('sensor.')&&(this.isLux(x)||x.entity===a.lux_entity)).map(x=>[x.entity,x.name])],true);
        if(kind==='lux'||a.lux_entity)body+=this.field('Einschalten unter / bei (lx)',q+'lux_on','number',{min:0,max:1000000});
        if(kind==='lux')body+=this.field('Einschaltverzögerung (Sekunden)',q+'on_delay','number',{min:0,max:86400})+this.select('Programm beenden bei',q+'lux_end',[['above','Überschreitung'],['below','Unterschreitung']],true)+this.field('Endschwelle (lx)',q+'lux_off','number',{min:0,max:1000000})+this.field('Endbedingung für (Sekunden)',q+'delay','number',{min:0,max:86400});
      }
      body+=this.select('Bei Programmende',q+'end_action',[['restore','Ursprünglichen Zustand wiederherstellen'],['off','Ausschalten'],['keep','Zustand beibehalten'],['fallback','Lampeneinstellung verwenden']]);
    }
    const folded=this.editor.collapsed?.has(a.id);
    return `<div class="editor-action"><div class="editor-action-head">${this.btn('fold-action',this.chevron(!folded)+`<span class="action-fold-text"><strong>${a.name?.trim()?this.user(a.name.trim()):this.t('Schaltaktion')+' '+(i+1)}</strong><small>${this.user(this.targetNames(a))} · ${lmEsc(this.actionText(a))}</small></span>`,`data-id="${lmEsc(a.id)}" aria-expanded="${!folded}"`,'action-fold')}<div class="list-tools">${this.toggle(a.enabled,'Schaltaktion '+(i+1)+' aktivieren',`data-path="${q}enabled"`)}${this.btn('copy-action',this.icon('copy'),`data-index="${i}" title="Aktion kopieren" aria-label="Aktion kopieren"`,'icon')}${this.btn('remove-action',this.icon('delete'),`data-index="${i}" title="Aktion entfernen" aria-label="Aktion entfernen"`,'icon danger')}</div></div>${folded?'':`<div class="editor-action-body grid">${body}</div>`}</div>`;
  }
  guide(){
    if(this.language()==='en')return `
      <h3>Settings</h3>
      <p>Use <b>Select lights</b> and <b>Select sensors</b> to add Home Assistant entities. The pickers show names and entity IDs. Lights are grouped by their Home Assistant area. Use the arrows to reorder areas. Lights within an area are alphabetical. The sensor list shows current readings or states. For opening contacts with custom states, enter the exact open and closed values, separated by commas.</p>
      <h3>Programs</h3>
      <p>Time and sensor programs are grouped under larger headings that line up with program names and can be expanded or collapsed. The Vacation filter beside + Program shows programs without Pause during vacation. Press it again to show all programs. Expanded programs use compact action spacing. Each compact entry shows the weekdays and, for sensor programs, the validity window. On wider screens, use the arrows to reorder programs within each group, or use the copy icon to create an initially disabled copy. Mobile screens show only the enable switch and edit button. Select lights and areas once per program. The selection applies to all its actions. When editing an older program with mixed targets, choose shared targets before saving.</p>
      <p>Actions can have names and can be expanded or collapsed together in the editor. Set the weekdays and, if needed, enable the season restriction and enter dates as DD.MM. The browser remembers program, group and readings-panel expansion for each user.</p>
      <h3>Time program</h3>
      <p>Actions can use a fixed time, sunrise or sunset. Solar actions support an offset. The calculated switching time respects the earliest and latest times. The daily schedule hides past recurring times. Use <b>Skip</b> to omit an upcoming action for today. Use <b>+ Additional action</b> to schedule a one-time action for later today.</p>
      <h3>Sensor programs</h3>
      <p>Set the validity window and configure the sensor condition in each action. For illuminance, set the activation and end thresholds and their delays. For motion, an optional lux limit is checked when the action starts. At the end, choose whether to restore, turn off, keep the current state or use the light setting.</p>
      <p>The overview shows whether the program’s conditions are met and lists blocking reasons. Motion does not have to be detected for a motion program to show as active. <b>Pause until tomorrow</b> pauses it until midnight. Use <b>Resume today</b> to end the pause early. An active opening-contact override can remain until the contact closes.</p>
      <h3>Light settings and priority</h3>
      <p>When switching on, set brightness and choose the last color setting, white temperature, a color or an eligible Hue scene. A Hue scene is offered when its entity ID matches the technical light name followed by an underscore for every selected light entity.</p>
      <p>Opening contacts have priority over motion, then illuminance, then time programs. Within the same sensor priority, the higher program wins. For time programs the latest due action takes precedence. At the same time, a one-time action takes precedence over a recurring one, then list order decides.</p>
      <h3>Readings and backups</h3>
      <p>The Readings panel under Programs shows sunrise, sunset and sensors used in programs. Sensor programs has its own collapsible Readings panel for sensor values. Settings includes a collapsible daily switching history with light names, command details and results. Completed means that Home Assistant accepted the service call. The history is retained across restarts and resets at midnight in the Home Assistant time zone. All controls use the locally bundled HA UI Kit 1.0.0. The compact Programs tab and the clock and sensor icons use the same mobile arrangement as Shutter Manager. Light status can be expanded directly in Settings using its heading. Settings also contains backup and restore, vacation mode, and the DE/EN language selector.</p>`;
    return `
      <h3>Einstellungen</h3>
      <p>Über <b>Lampen auswählen</b> und <b>Sensoren auswählen</b> fügst du Entitäten aus Home Assistant hinzu. Die Auswahldialoge zeigen Name und Entitäts-ID. Lampen sind nach HA-Bereich gruppiert. Die Bereiche lassen sich mit den Pfeilen sortieren, die Lampen darin stehen alphabetisch. Bei Sensoren steht der aktuelle Messwert oder Zustand neben dem Namen. Bei Öffnungskontakten mit eigenen Zustandswerten gibst du die exakten Offen- und Geschlossen-Werte kommagetrennt ein.</p>
      <h3>Programme</h3>
      <p>Die größeren Überschriften für Zeitprogramme und Sensorprogramme sind linksbündig mit den Programmnamen und lassen sich auf- und zuklappen.</p>
      <p>Zeit- und Sensorprogramme stehen in getrennten Gruppen. Der Filter Urlaub neben + Programm zeigt Programme ohne „Im Urlaub aussetzen“. Erneutes Drücken zeigt alle Programme. Aufgeklappte Programme zeigen die Schaltaktionen mit kompakten Abständen. Jeder kompakte Eintrag zeigt die Wochentage und bei Sensorprogrammen das Gültigkeitsfenster. Auf breiten Bildschirmen änderst du mit den Pfeilen die Reihenfolge innerhalb der Gruppe. Das Kopiersymbol erstellt eine zunächst deaktivierte Kopie. Mobil werden nur der Aktivschalter und das Bearbeiten-Symbol angezeigt. Wähle Lampen und Bereiche einmal für das gesamte Programm. Die Auswahl gilt für alle Schaltaktionen. Haben Aktionen eines älteren Programms unterschiedliche Ziele, wähle beim Bearbeiten gemeinsame Ziele, bevor du speicherst.</p>
      <p>Schaltaktionen können eigene Namen haben und im Editor gemeinsam auf- oder zugeklappt werden. Wähle die Wochentage und bei Bedarf <b>Saison einschränken</b>. Die Saisonfelder verwenden TT.MM. Der Browser merkt sich je Benutzer den Aufklappzustand der Programmgruppen, Programme und Messwerte.</p>
      <h3>Zeitprogramm</h3>
      <p>Als Auslöser stehen Uhrzeit, Sonnenaufgang und Sonnenuntergang zur Wahl. Bei Sonnenzeiten kannst du einen Versatz einstellen. Die berechnete Schaltzeit berücksichtigt <b>Frühestens</b> und <b>Spätestens</b>. Die Tagesübersicht blendet vergangene wiederkehrende Schaltzeiten aus. Mit <b>Auslassen</b> überspringst du eine bevorstehende Aktion für heute. Über <b>+ Zusätzliche Aktion</b> planst du eine einmalige Schaltung für später am selben Tag.</p>
      <h3>Sensorprogramme</h3>
      <p>Lege das Gültigkeitsfenster fest und stelle die Sensorbedingung je Schaltaktion ein. Helligkeitsaktionen haben getrennte Start- und Endschwellen mit eigenen Verzögerungen. Bei Bewegung wird die optionale Lux-Grenze beim Start geprüft. Bei Programmende kannst du den ursprünglichen Zustand wiederherstellen, ausschalten, den Zustand beibehalten oder die Lampeneinstellung verwenden.</p>
      <p>Die Übersicht zeigt, ob die Rahmenbedingungen erfüllt sind, und nennt sonst die Gründe. Ein Bewegungsprogramm kann auch ohne erkannte Bewegung aktiv sein. <b>Bis morgen aussetzen</b> pausiert bis Mitternacht. Über <b>Heute wieder aktivieren</b> kannst du die Pause vorzeitig beenden. Ein bereits aktiver Öffnungsvorrang kann bis zum Schließen bestehen bleiben.</p>
      <h3>Lichtwerte und Vorrang</h3>
      <p>Beim Einschalten kannst du Helligkeit und Farbe einstellen. Zur Wahl stehen die letzte Einstellung, Weißtöne, eine Farbe oder eine passende Hue-Szene. Eine Szene wird angeboten, wenn ihre Entitäts-ID für jede gewählte Lichtentität zum technischen Lampennamen mit anschließendem Unterstrich passt.</p>
      <p>Öffnungskontakte haben Vorrang vor Bewegung, dann folgen Helligkeit und Zeitprogramme. Bei gleichem Sensorvorrang gewinnt das weiter oben gespeicherte Programm. Bei Zeitprogrammen zählt die jüngste fällige Aktion. Bei gleicher Uhrzeit hat die Einmalaktion Vorrang vor der wiederkehrenden Aktion, danach entscheidet die Listenreihenfolge.</p>
      <h3>Messwerte und Sicherung</h3>
      <p>Die Messwerte unter <b>Programme</b> zeigen Sonnenaufgang, Sonnenuntergang und die in Programmen verwendeten Sensoren. Auch unter <b>Sensorprogramme</b> kannst du die Sensormesswerte separat einblenden. In den Einstellungen zeigt „Heutige Schaltungen“ aufklappbar Lampennamen, Befehle und Ergebnisse. Erfolgreich bedeutet, dass Home Assistant den Dienstaufruf angenommen hat. Die Historie bleibt nach Neustarts erhalten und beginnt um Mitternacht in der Home-Assistant-Zeitzone neu. Alle Bedienelemente verwenden den lokal mitgelieferten HA UI Kit 1.0.0. Der kompakte Tab Programme und die Uhr- und Sensorsymbole sind mobil wie im Shutter Manager angeordnet. Lampenstatus lässt sich direkt in den Einstellungen über die Überschrift aufklappen. Dort findest du auch Sicherung und Wiederherstellung, den Urlaubsmodus und die Sprachwahl DE/EN.</p>`;
  }
  setPath(path,value){const keys=path.split('.');let obj=this.editor.value;for(const k of keys.slice(0,-1))obj=obj[k];obj[keys.at(-1)]=value;}
  input(e){const t=e.target;if(this.editor&&t.dataset.contactStates){this.editor.contactInputs[t.dataset.contactStates]=t.value;return;}if(t.hasAttribute('data-lamp-search')){for(const list of this.shadowRoot.querySelectorAll('.lamp-selection'))this.filterLightRows(list);return;}if(this.editor&&t.dataset.season){this.editor.seasonInputs??={};this.editor.seasonInputs[t.dataset.season]=t.value;return;}if(this.editor&&t.hasAttribute('data-brightness')){const i=Number(t.dataset.brightness);this.editor.value.actions[i].brightness=Number(t.value);this.shadowRoot.querySelector(`[data-brightness-value="${i}"]`).textContent=t.value+' %';return;}if(this.editor&&t.hasAttribute('data-white')){const i=Number(t.dataset.white),a=this.editor.value.actions[i];a.kelvin=Number(t.dataset.maxKelvin)-Number(t.value);const out=this.shadowRoot.querySelector(`[data-white-value="${i}"]`);if(out)out.textContent=a.kelvin+' K';return;}if(!this.editor||!t.dataset.path||t.type==='checkbox'||t.tagName==='SELECT')return;
    this.setPath(t.dataset.path,t.type==='number'?(t.value===''?null:Number(t.value)):t.value);}
  async change(e){const t=e.target;
    if(t.dataset.actionToggle){const c=lmClone(this.config),p=c.programs.find(p=>p.id===t.dataset.program),a=p.actions.find(a=>a.id===t.dataset.actionToggle);a.enabled=t.checked;await this.save(c);this.render();return;}
    if(t.dataset.toggle){const c=lmClone(this.config),p=c.programs.find(p=>p.id===t.dataset.toggle);p.enabled=t.checked;await this.save(c);this.render();return;}
    if(t.hasAttribute('data-vacation')){const c=lmClone(this.config);c.vacation=t.checked;await this.save(c);this.render();return;}
    if(t.id==='lm-backup'){const f=t.files[0];if(!f)return;try{if(f.size>2000000)throw Error(this.t('Sicherung zu groß (maximal 2 MB).'));
      const parsed=JSON.parse(await f.text()),c=parsed.config||parsed;
      if(!confirm(this.t('Gesamte Light-Manager-Konfiguration durch diese Sicherung ersetzen? Aktive Programme werden sofort neu bewertet.')))return;
      await this.save(c);this.render();}catch(err){this.error=err.message;this.render();}return;}
    if(!this.editor)return;
    if(t.hasAttribute('data-brightness-keep')){const a=this.editor.value.actions[Number(t.dataset.brightnessKeep)];a.brightness=t.checked?null:100;this.render();return;}
    if(t.hasAttribute('data-assign-light')){this.error='';this.editor.lampIds=t.checked?[...new Set([...this.editor.lampIds,t.value])]:this.editor.lampIds.filter(id=>id!==t.value);this.shadowRoot.querySelector('[data-assignment-count]').textContent=this.editor.lampIds.length+' / '+this.config.lamps.length;this.updateLightList(t.closest('[data-light-list]'));return;}
    if(t.dataset.array){this.error='';const v=lmClone(this.value(t.dataset.array)||[]),value=t.dataset.array==='days'?Number(t.value):t.value;this.setPath(t.dataset.array,t.checked?[...new Set([...v,value])]:v.filter(x=>x!==value));if(t.dataset.array==='entities'&&this.editor.section==='lamp_selection')this.updateLightList(t.closest('[data-light-list]'));const count=this.shadowRoot.querySelector(`[data-lamp-count="${t.dataset.array}"]`);if(count)count.textContent=(this.value(t.dataset.array)||[]).length+' / '+this.shadowRoot.querySelectorAll(`[data-array="${t.dataset.array}"]`).length;if(t.dataset.array==='targets'){
      for(const action of this.editor.value.actions)this.updateActionTargets(action,this.editor.value.targets);
      this.editor.mixedProgramTargets=false;
      this.render();
    }return;}
    if(t.hasAttribute('data-colormode')){this.error='';const a=this.editor.value.actions[Number(t.dataset.colormode)];if(t.value.startsWith('scene.')){a.mode='scene';a.scene=t.value;a.kelvin=null;a.rgb=null;a.brightness=null;this.render();return;}a.mode='on';delete a.scene;const r=this.whiteRange(a);a.kelvin=t.value==='white'?Math.max(r.min,Math.min(r.max,a.kelvin??2700)):null;a.rgb=t.value==='color'?(a.rgb||[255,200,140]):null;this.render();return;}
    if(t.dataset.path){this.setPath(t.dataset.path,t.type==='checkbox'?t.checked:t.type==='number'?(t.value===''?null:Number(t.value)):t.value);
      if(t.dataset.path.endsWith('.mode')&&t.value==='scene'){const a=this.editor.value.actions[Number(t.dataset.path.split('.')[1])];a.scene=a.scene||this.availableScenes(a)[0]?.id||'';}
      if(t.dataset.path.endsWith('.lux_end')){const a=this.editor.value.actions[Number(t.dataset.path.split('.')[1])];if(a.lux_end==='below'&&a.lux_off>=a.lux_on)a.lux_off=Math.max(0,a.lux_on/2);if(a.lux_end==='above'&&a.lux_off<=a.lux_on)a.lux_off=Math.min(1000000,a.lux_on+70);}
      if(t.hasAttribute('data-redraw'))this.render();}
  }
  open(section,id,copy=false){this.error='';let value=id?lmClone(this.config[section].find(x=>section==='sensors'?x.entity===id:x.id===id)):{id:lmId(),name:''};
    if(!id){if(section==='lamps')Object.assign(value,{entity:'',rooms:[],zones:[],fallback:'off',members:[],is_group:false});
      if(section==='lamp_selection')value={entities:this.config.lamps.map(l=>l.entity)};
      if(section==='sensor_selection')value={entities:this.config.sensors.map(s=>s.entity)};
      if(section==='programs')Object.assign(value,{kind:'time',enabled:false,pause_in_vacation:false,days:[0,1,2,3,4,5,6],start:'00:00',end:'00:00',season_enabled:false,season_from:'',season_to:'',actions:[]});}
    if(copy){
      value.id=lmId();
      value.name+=this.t(' (Kopie)');
      value.enabled=false;
      delete value.paused_on;
      for(const action of value.actions){
        action.id=lmId();
        action.skips=[];
      }
    }
    if(section==='lamps')this.applyScenePrefix(value);
    this.editor={section,value,revision:this.data.revision,collapsed:new Set((value.actions||[]).map(a=>a.id)),lampSections:{},lampIds:['rooms','zones'].includes(section)?this.config.lamps.filter(l=>l[section].includes(value.id)).map(l=>l.id):[]};if(section==='programs')this.initProgramTargets();this.render();}
  resetFolds(){this.settingsOpen.clear();this.memberListsOpen.clear();}
  async click(e){
    const fold=e.target.closest('[data-ui="collapse"]');
    if(fold){const id=fold.closest('[data-settings]').dataset.settings;
      fold.getAttribute('aria-expanded')==='true'?this.settingsOpen.delete(id):this.settingsOpen.add(id);return;}
    const b=e.target.closest('button[data-op]');if(!b||this.busy)return;const op=b.dataset.op;
    if(op==='language'){this._language=b.dataset.language;try{localStorage.setItem(this.languageKey,this._language);}catch{}this.render();}
    else if(op==='filter-vacation'){this.vacationFilter=!this.vacationFilter;this.render();}
    else if(op==='tab'){this.resetFolds();this.tab=b.dataset.tab;this.error='';this.render();}
    else if(op==='settings'){this.resetFolds();this.tab='settings';this.render();}
    else if(op==='fold-members'){const key=b.dataset.section+':'+b.dataset.id;this.memberListsOpen.has(key)?this.memberListsOpen.delete(key):this.memberListsOpen.add(key);this.render();}
    else if(op==='move-program'){
      const c=lmClone(this.config), program=c.programs.find(p=>p.id===b.dataset.id);
      if(!program||program.once_date)return;
      const group=c.programs.filter(p=>!p.once_date&&(!this.vacationFilter||!p.pause_in_vacation)&&(p.kind==='time')===(program.kind==='time'));
      const neighbor=group[group.indexOf(program)+Number(b.dataset.delta)];
      if(!neighbor)return;
      const index=c.programs.indexOf(program), next=c.programs.indexOf(neighbor);
      [c.programs[index],c.programs[next]]=[c.programs[next],c.programs[index]];
      await this.save(c);this.render();
    }
    else if(op==='move-area'){
      const order=this.lampAreaGroups().map(group=>group.id).filter(Boolean), index=order.indexOf(b.dataset.id);
      const next=index+Number(b.dataset.delta);
      if(index<0||next<0||next>=order.length)return;
      [order[index],order[next]]=[order[next],order[index]];
      const c=lmClone(this.config);
      c.area_order=[...order,...(c.area_order||[]).filter(id=>!order.includes(id))];
      await this.save(c);this.render();
    }
    else if(op==='fold-settings'){const section=b.dataset.section;this.settingsOpen.has(section)?this.settingsOpen.delete(section):this.settingsOpen.add(section);this.render();}
    else if(op==='section'){this.section=b.dataset.section;this.render();}
    else if(op==='guide'){this.resetFolds();this.tab='guide';this.render();}
    else if(op==='overview'){
      const open=!this.overviewVisible();
      if(this.tab==='sensors')this.sensorOverviewOpen=open;
      else this.overviewOpen=open;
      this.saveProgramFolds();this.render();
    }
    else if(op==='fold-program-group'){
      const key=b.dataset.group;
      this.collapsedProgramGroups??=new Set();
      if(this.collapsedProgramGroups.has(key))this.collapsedProgramGroups.delete(key);
      else this.collapsedProgramGroups.add(key);
      this.saveProgramFolds();
      this.render();
    }
    else if(op==='expand-actions'||op==='collapse-actions'){
      this.editor.collapsed=new Set(op==='expand-actions'?[]:this.editor.value.actions.map(action=>action.id));
      this.render();
    }
    else if(op==='fold-action'){this.editor.collapsed??=new Set();const id=b.dataset.id;this.editor.collapsed.has(id)?this.editor.collapsed.delete(id):this.editor.collapsed.add(id);this.render();}
    else if(op==='cancel'){this.editor=null;this.error='';this.render();}
    else if(op==='once'){this.open('programs');const p=this.editor.value;p.name=this.t('Einmalige Schaltung');p.once_date=this.data.today;p.enabled=true;p.days=[0,1,2,3,4,5,6];const a=lmAction();a.time=new Intl.DateTimeFormat('en-GB',{timeZone:this.data.timezone||'Europe/Berlin',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date(Date.now()+300000));p.actions=[a];this.editor.collapsed.clear();this.render();}
    else if(op==='select-lamps')this.open('lamp_selection');
    else if(op==='select-sensors')this.open('sensor_selection');
    else if(op==='copy-program')this.open('programs',b.dataset.id,true);
    else if(op==='add'||op==='edit')this.open(b.dataset.section,b.dataset.id);
    else if(op==='commit')await this.commit();
    else if(op==='expand'){const id=b.dataset.id;this.expanded.has(id)?this.expanded.delete(id):this.expanded.add(id);this.saveProgramFolds();this.render();}
    else if(op==='add-action'){const a=lmAction();a.targets=[...this.editor.value.targets];if(this.editor.value.kind==='contact')a.delay=0;if(this.editor.value.kind==='lux')a.end_action='off';this.editor.value.actions.push(a);this.editor.collapsed.add(a.id);this.render();}
    else if(op==='remove-action'){this.editor.value.actions.splice(Number(b.dataset.index),1);this.render();}
    else if(op==='copy-action'){const a=lmClone(this.editor.value.actions[Number(b.dataset.index)]);a.id=lmId();this.editor.value.actions.push(a);this.editor.collapsed.add(a.id);this.render();}
    else if(op==='pause-sensor'){
      const c=lmClone(this.config), program=c.programs.find(p=>p.id===b.dataset.id), today=this.data.today;
      if(!program||program.kind==='time'||!today)return;
      if(program.paused_on===today)delete program.paused_on;
      else program.paused_on=today;
      await this.save(c);this.render();
    }
    else if(op==='skip'){const c=lmClone(this.config),a=c.programs.find(p=>p.id===b.dataset.program).actions.find(a=>a.id===b.dataset.id),day=this.data.today;
      a.skips=a.skips.includes(day)?a.skips.filter(x=>x!==day):[...a.skips.filter(x=>x>=day),day];await this.save(c);this.render();}
    else if(op==='delete')await this.remove(b.dataset.section,b.dataset.id);
    else if(op==='export'){const blob=new Blob([JSON.stringify({product:'Light Manager',version:LM_VERSION,config:this.config},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Light-Manager-Sicherung-'+this.data.today+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
    else if(op==='import')this.shadowRoot.getElementById('lm-backup').click();
  }
  async remove(section,id){const lamp=section==='lamps';const once=section==='programs'&&this.config.programs.find(p=>p.id===id)?.once_date;if(!confirm(this.t(lamp?'Lampe aus Light Manager entfernen?':once?'Einmalige Schaltung löschen?':'Eintrag löschen? Verwendete Schaltziele müssen zuvor aus Programmen entfernt werden.')))return;
    const c=lmClone(this.config);c[section]=c[section].filter(v=>v.id!==id);
    if(section==='rooms'||section==='zones')for(const l of c.lamps)l[section]=l[section].filter(v=>v!==id);
    if(await this.save(c,this.editor?.revision??this.data.revision)){this.editor=null;this.error='';}this.render();}
}
if(!customElements.get('light-manager-card'))customElements.define('light-manager-card',LightManagerCard);
window.customCards=window.customCards||[];
if(!window.customCards.some(c=>c.type==='light-manager-card'))window.customCards.push({type:'light-manager-card',name:'Light Manager',description:'Lichtprogramme, Sensoren, Zonen und Zimmer lokal verwalten.',preview:false});
