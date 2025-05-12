from flask import Flask, jsonify, render_template
import os
import json

app = Flask(__name__)

def carica_domande():
    file_path = "questions.json"

    # Controllo se il file esiste
    if not os.path.exists(file_path):
        print("❌ ERRORE: Il file questions.json non esiste!")
        return []
    
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            questions = json.load(file)
        
        if not questions:
            print("❌ ERRORE: Il file questions.json è vuoto!")
            return []

        print(f"✅ Caricate {len(questions)} domande!")
        return questions

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
