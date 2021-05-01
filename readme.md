Die Vorlage beinhaltet CSS/HTML/JS-Linter. Diese sind konfiguriert. 

Getting Started
1. Entzippen von der Vorlage.
2. Installieren Sie die Dependencies der Vorlage
   - Console/Terminal: «npm install» im Root vom Projekt
3. Testen Sie, ob alles richtig installiert wurde
   - Console: «npm run all» im Root vom Projekt
   - Erwarte Ausgabe: 1 Warnungen und «npm run all completed»
4. Woche 1
   - HTML Gerüst erstellen für die Wireframes und Beginn CSS:
      - /public/index.html
      - /public/styles/index.css
   - Webstorm:
      - /public/index.html "ausführen".
   - Visual Studio Code:
      - Live Server nutzen: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer    

Folgende Befehle sind dann möglich

| Befehl  |  Beschreibung |
|---|---|
| npm run stylelint  |   Testet ob die CSS Files in Ordnung sind. |
| npm run w3c  |   Testet ob die HTML Files in Ordnung sind. |
| npm run eslint  |  Testet ob die JS Files in Ordnung sind. |
| npm run all  |   Führt die Tests für CSS/HTML/JS aus. |
| npm run start  |  Started den Web-Server: http://localhost:3000 |
