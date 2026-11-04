# Migration verstehen

Interaktive Lernwebseite zu Migration und zur Schweiz, mit Fotos, Scrollgeschichte, Zeitstrahl, Quiz und persönlichem Portfolio.

Die veröffentlichte Webseite liegt unter [Gedeon111.github.io/migration-verstehen](https://gedeon111.github.io/migration-verstehen/).

## Dateien

Die vollständige Webseite liegt in `docs/`. Sie verwendet HTML, CSS und JavaScript ohne Buildschritt. `docs/.nojekyll` stellt sicher, dass GitHub Pages auch die lokal gespeicherte Animationsbibliothek unverändert ausliefert.

## Lokal ansehen

`docs/index.html` direkt im Browser öffnen oder im Repository `python -m http.server 8000 --directory docs` ausführen. Die Vorschau ist dann unter `http://localhost:8000` erreichbar.

## Änderungen veröffentlichen

Dateien in `docs/` bearbeiten, committen und auf `main` pushen. GitHub Pages veröffentlicht den Ordner `/docs` automatisch. Diese Einstellung steht im Repository unter **Settings > Pages > Deploy from a branch**.

## Inhalte und Datenschutz

Die Inhalte behandeln Ursachen und Folgen der Migration, Schweizer Migrationsgeschichte, Menschenwürde und drei mögliche Zukunftsszenarien. Quellen und redaktioneller Stand stehen auf der Webseite. Fotos dienen als Symbolbilder; die Beispiele sind erfunden.

Portfolio-Notizen werden nur im Browser gespeichert und können als Text heruntergeladen werden. Das Repository enthält keine persönlichen Portfolioeinträge. Die Notizen werden weder an GitHub noch an einen anderen Server gesendet. Die Speicherung gehört zur jeweiligen Webseitenadresse; Notizen der früheren Webseite werden nicht automatisch übernommen.

Bildquellen stehen in [ASSETS.md](ASSETS.md), die MIT-Lizenz von Motion in [docs/vendor/MOTION-LICENSE.txt](docs/vendor/MOTION-LICENSE.txt).
