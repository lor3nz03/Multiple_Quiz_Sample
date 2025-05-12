# Quiz Form Project

Questo è un piccolo progetto che crea un form dove poter inserire le domande a risposta multipla e risponderci. È progettato per essere semplice e intuitivo, permettendo agli utenti di interagire con un quiz basato su domande predefinite.

## Struttura del Progetto

- **server.py**: Il file principale che gestisce il server Flask. Serve le pagine HTML e fornisce le API per ottenere le domande del quiz.
- **static/**: Contiene i file statici come JavaScript e CSS.
  - **script.js**: Gestisce la logica del frontend per il caricamento e la visualizzazione delle domande.
  - **styles.css**: Contiene gli stili CSS per il layout e il design del quiz.
- **templates/**: Contiene i file HTML.
  - **index.html**: La pagina principale del quiz.
- **questions.json**: Contiene le domande del quiz in formato JSON.

## Formato del File JSON

Il file `questions.json` deve essere formattato con le domande, le opzioni e la risposta corretta come segue:

```json
[
  {
    "question": "Testo della domanda",
    "options": {
      "A": "Opzione A",
      "B": "Opzione B",
      "C": "Opzione C",
      "D": "Opzione D"
    },
    "answer": "Lettera della risposta corretta"
  }
]
```

## Installazione

Per eseguire questo progetto, è necessario avere Python e Flask installati. Segui i passaggi seguenti per configurare l'ambiente:

1. **Clona il repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Crea un ambiente virtuale**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Su Windows usa `venv\\Scripts\\activate`
   ```

3. **Installa le dipendenze**:
   ```bash
   pip install flask
   ```

## Esecuzione del Progetto

Per avviare il server Flask, esegui il seguente comando:

```bash
python server.py
```

Il server sarà avviato su `http://0.0.0.0:5000`. Apri un browser e naviga a questo indirizzo per visualizzare il quiz.

## Utilizzo

- **Caricamento delle Domande**: Le domande vengono caricate dal file `questions.json`. Assicurati che il file sia formattato correttamente.
- **Interazione con il Quiz**: Seleziona le risposte e invia il form per vedere il tuo punteggio.

## Contributi

Se desideri contribuire a questo progetto, sentiti libero di fare un fork del repository e inviare una pull request.

