const questions = [
{
    type: "truefalse",
    question: "Nackademins frontendutbildning innehåller HTML, CSS och JavaScript.",
    correctText: "Sant",
    correctAnswer: true
},

];

const userAnswers = [];

let counter = 0;
let container = document.querySelector(".question-container");

function showQuestion () {
    container.innerHTML = `
        <h2>Fråga ${counter + 1}</h2>
        <h3> ${questions[counter].question} </h3>

        <label>
            <input type="radio" name="svar" value="true"> Sant
        </label>
        <br>
        <label>
            <input type="radio" name="svar" value="false"> Falskt
        </label>
    `;
    }
    
showQuestion (counter);
document.querySelector("#nextBtn").addEventListener("click", () => {
    const selected = document.querySelector('input[name="svar"]:checked');

    if (selected) {
        userAnswers[counter] = selected.value === "true";
    }
    else {
        userAnswers[counter] = null;
    }
    
    counter++;

    if (counter < questions.length) {
        showQuestion(counter)
    }
    else {
        container.innerHTML = "Du har svarat på alla frågor.";
    }
});

document.querySelector("#checkBtn").addEventListener("click", () => {
    container.innerHTML = "";
    const resultList = document.querySelector(".result-list");
    let score = 0;
    for (i=0;i < questions.length; i++){
        const correct = questions[i].correctAnswer;
        const answer = userAnswers[i];

        const resultOption = document.createElement("li");
        resultList.appendChild(resultOption);

        const resultQuestion = document.createElement("p");
        resultQuestion.innerHTML = `Fråga ${i+1}: ${questions[i].question}`;
        resultOption.appendChild(resultQuestion);

        const resultAnswer = document.createElement("p");
        resultAnswer.innerHTML = `Rätt svar: ${questions[i].correctText}`;
        resultOption.appendChild(resultAnswer);

        const resultYourAnswer = document.createElement("p");
        if (answer === null) {
            resultYourAnswer.innerHTML = "Du svarade tyvärr inte på frågan: + 0 poäng!"
        }
        else if (answer === correct){
            resultYourAnswer.innerHTML = "Du svarade Rätt: + 1 poäng!"
            score++;
        }
        else {
        resultYourAnswer.innerHTML = "Du svarade tyvärr Fel: + 0 poäng!"
        }
        resultOption.appendChild(resultYourAnswer);
    }
});