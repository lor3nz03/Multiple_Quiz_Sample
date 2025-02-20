from flask import Flask, jsonify, render_template
import os

app = Flask(__name__)

def carica_domande():
    file_path = "domande.txt"

    # Controllo se il file esiste
    if not os.path.exists(file_path):
        print("❌ ERRORE: Il file domande.txt non esiste!")
        return []
    
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            lines = file.readlines()
        
        if not lines:
            print("❌ ERRORE: Il file domande.txt è vuoto!")
            return []

        domande = []
        i = 0
        while i < len(lines):
            if i + 5 >= len(lines):  # Se non ci sono abbastanza righe per una domanda
                print(f"⚠️ Errore nel formato delle domande (riga {i+1})")
                break

            domanda = lines[i].strip()
            risposte = [lines[i+1].strip()[3:], lines[i+2].strip()[3:], lines[i+3].strip()[3:], lines[i+4].strip()[3:]]
            corretta = lines[i+5].strip()

            domande.append({"domanda": domanda, "risposte": risposte, "corretta": corretta})
            i += 6  # Passa alla prossima domanda

        print(f"✅ Caricate {len(domande)} domande!")
        return domande

    except Exception as e:
        print(f"❌ ERRORE durante la lettura del file: {e}")
        return []

@app.route("/")
def index():
    return render_template("index.html")  # Flask cerca index.html nella cartella templates/

@app.route("/get_questions")
def get_questions():
    return jsonify(carica_domande())  # Restituisce le domande in formato JSON

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
