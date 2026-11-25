# Migration verstehen

Interaktive Lernwebseite zu Migration und zur Schweiz, mit Fotos, Scrollgeschichte, Zeitstrahl und Quiz.

Die veröffentlichte Webseite liegt unter [Gedeon111.github.io/migration-verstehen](https://gedeon111.github.io/migration-verstehen/).

## Dateien

Die vollständige Webseite liegt in `docs/`. Sie verwendet HTML, CSS und JavaScript ohne Buildschritt. `docs/.nojekyll` stellt sicher, dass GitHub Pages auch die lokal gespeicherte Animationsbibliothek unverändert ausliefert.

## Lokal ansehen

`docs/index.html` direkt im Browser öffnen oder im Repository `python -m http.server 8000 --directory docs` ausführen. Die Vorschau ist dann unter `http://localhost:8000` erreichbar.

## Änderungen veröffentlichen

Dateien in `docs/` bearbeiten, committen und auf `main` pushen. GitHub Pages veröffentlicht den Ordner `/docs` automatisch. Diese Einstellung steht im Repository unter **Settings > Pages > Deploy from a branch**.

## Inhalte und Datenschutz

Die Inhalte behandeln Ursachen und Folgen der Migration, Schweizer Migrationsgeschichte, Menschenwürde und drei mögliche Zukunftsszenarien. Quellen und redaktioneller Stand stehen auf der Webseite. Fotos dienen als Symbolbilder; die didaktischen Fallbeispiele sind erfunden. Der zusätzliche Interviewabschnitt fasst ein bereitgestelltes Einzelinterview sinngemäss und ohne Namen zusammen. Das Originalvideo und das automatische Rohtranskript werden nicht veröffentlicht.

Bildquellen stehen in [ASSETS.md](ASSETS.md), die MIT-Lizenz von Motion in [docs/vendor/MOTION-LICENSE.txt](docs/vendor/MOTION-LICENSE.txt).

## Ergänzungen vom 23. November 2026

Der Trendreport 2026 ist als PDF unter `docs/material/` eingebunden. `materialien.css` und `materialien.js` ergänzen einen interaktiven Vergleich der SEM-Salden 2023 bis 2025, separat ausgewiesene Halbjahresdaten 2026, eine Einordnung des Szenarios 2030 und thematische Interviewauszüge mit Zeitmarken. Die Definitionen von SEM und BFS bleiben getrennt. Das Quiz enthält sieben Fragen zu den Grundlagen und den neuen Quellen.

Der Originalton der Online-Besprechung ist zusätzlich als MP3 eingebunden: `docs/material/interview-migration.mp3` (10:35 Minuten, ca. 7,6 MB, Mono mit 96 kbit/s). Der native Audioplayer startet ohne Autoplay und lädt zunächst nur Metadaten. Vier Kapitelbuttons springen zur passenden Stelle und öffnen die zugehörige Zusammenfassung. Ein direkter Download bleibt auch ohne JavaScript verfügbar.

Die Aufnahme stammt aus einer Online-Besprechung. Das genaue Gesprächsdatum ist nicht bekannt; das Datum im ursprünglichen Dateinamen ist kein gesichertes Aufnahmedatum.
