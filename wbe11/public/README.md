# WBE 4 Gewinnt Mini-Projekt
In diesem Projekt ging es darum auf verschiedene Arten das Spiel **Vier Gewinnt** zu implementieren.

Dabei mussten zwei funktionialitäten `render-sjdon` und `connect4-winner` abgegeben werden und wurden schon im Vorraus bewertet.

Das Spiel ist ganz einfach und sollte jedem bekannt sein. Man wirft einen "Chip" in eine der Spalten hinein, welcher durch Gravitation bis zum letzten freien Platz herunterfällt.
Abwechslungsweise werden diese Eingeworfen, bis man keine "Chips" hat, das Spielfeld voll ist oder ein Spieler es schafft 4 nacheinanderfolgende Chips (horizontal, vertikal oder in diagonaler Reihenfolge) zu legen.

## Projekte
* [WBE 8 Aufgabe 1]
* [WBE 8 Aufgabe 2]
* [WBE 9]
* [WBE 10 (nicht auf GitHub Pages lauffähig)]

## Umsetzung
Das Projekt wurde mit Javascript sowie HTML und CSS umgesetzt. Die Datenspeicherung erfolgt auf den LocalStorage, da dieser via GitHub Pages erreichbar ist.


Erwähnenswerte Codeanpassungen sind:
* Spielfeld in ein 1D Array konvertiert
* `connect4-winner` und statische Variabeln ausgelagert
* performance tests bei `render-sjdon`
* Fehlerhandling bei Grenzfällen:
  * Spalte ist voll
  * Spieler hat gewonnen aber es wird versucht weiter zu spielen
  * Undo wird auf ein Feld ohne History ausgeführt
  * Load wird ausgeführt ohne etwas im LocalStorage zu haben


Nun gibt es nichts mehr zu sagen als Let's Play.

