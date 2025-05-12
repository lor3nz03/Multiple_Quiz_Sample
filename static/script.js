document.addEventListener("DOMContentLoaded", async function () {
    const quizContainer = document.getElementById("quiz-container");
    const form = document.getElementById("quiz-form");
    const risultatoDiv = document.getElementById("risultato");

    try {
        const response = await fetch("/get_questions");
        if (!response.ok) throw new Error(`Errore nel caricamento delle domande: ${response.status}`);

        const questions = await response.json();
        if (!Array.isArray(questions) || questions.length === 0) throw new Error("Nessuna domanda ricevuta dal server.");

        questions.forEach((q, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question-block");
            questionDiv.innerHTML = `<p><strong>${q.question}</strong></p>`;

            Object.entries(q.options).forEach(([key, option]) => {
                const radioId = `q${index}_${key}`;
                const label = document.createElement("label");
                label.classList.add("answer-label");
                label.htmlFor = radioId;

                const radio = document.createElement("input");
                radio.type = "radio";
                radio.name = `q${index}`;
                radio.value = key; // A, B, C, D
                radio.id = radioId;

                label.appendChild(radio);
                label.appendChild(document.createTextNode(` ${option}`)); // Testo accanto al radio

                questionDiv.appendChild(label);
            });

            quizContainer.appendChild(questionDiv);
        });

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            let punteggio = 0;
            risultatoDiv.innerHTML = "";

            questions.forEach((q, index) => {
                const questionBlock = document.querySelectorAll(".question-block")[index];
                const options = questionBlock.querySelectorAll("input[type='radio']");
                let rispostaData = null;

                options.forEach(opt => {
                    const label = document.querySelector(`label[for="${opt.id}"]`);
                    label.classList.remove("correct", "wrong");
                });

                options.forEach(opt => {
                    if (opt.checked) {
                        rispostaData = opt.value;
                    }
                });

                options.forEach(opt => {
                    const label = document.querySelector(`label[for="${opt.id}"]`);

                    if (opt.value === q.answer) {
                        label.classList.add("correct");
                    }

                    if (opt.checked) {
                        if (opt.value === q.answer) {
                            punteggio++;
                        } else {
                            label.classList.add("wrong");
                        }
                    }
                });
            });

            risultatoDiv.innerHTML = `<p>Hai risposto correttamente a <strong>${punteggio}</strong> domande su ${questions.length}.</p>`;
        });

    } catch (error) {
        console.error("Errore:", error);
        quizContainer.innerHTML = `<p class="text-danger">Errore nel caricamento delle domande. Controlla la console.</p>`;
    }
});
