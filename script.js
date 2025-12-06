const questions = [
{
    type: "trueFalse",
    question: "Ankademins frontendutbildning innehåller HTML, CSS och JavaScript.",
    correctText: "Sant",
    correctAnswer: true
},
{
    type: "multiChoise",
    question: 'Vilken datatyp är ["äpple", "päron", "banan"] i JavaScript?',
    correctText: "Array",
    correctAnswer: true
},




/*{
    type: "truefalse",
    question: "Ankademins frontendutbildning är 3 år lång",
    correctText: "Falskt",
    correctAnswer: false
},*/

];

const userAnswers = [];

let counter = 0;
let container = document.querySelector(".question-container");
showQuestion();

function showTrueFalse () {
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

function showQuestion (){
    if (questions[counter].type === "trueFalse"){
    showTrueFalse (counter);
    }
    else if (questions[counter].type === "multiChoise") {
        showMultiChoise (counter);
    }
}
function showMultiChoise () {
    container.innerHTML = `
        <h2>Fråga ${counter + 1}</h2>
        <h3> ${questions[counter].question} </h3>

        <label>
            <input type="radio" name="multiSvar" value="false"> Objekt
        </label>
        <br>
        <label>
            <input type="radio" name="multiSvar" value="false"> Sträng
        </label>
        <label>
            <input type="radio" name="multiSvar" value="true"> Array
        </label>
        <br>
        <label>
            <input type="radio" name="multiSvar" value="false"> Nummer
        </label>
    `;
}

function nextButton () {
    document.querySelector("#nextBtn").addEventListener("click", () => {
    
        let selected;

        if (questions[counter].type === "trueFalse") {
            selected = document.querySelector('input[name="svar"]:checked'); 
        }
        else if (questions[counter].type === "multiChoise") {
            selected = document.querySelector('input[name="multiSvar"]:checked');
        }
        userAnswers[counter] = selected ? selected.value === "true": null;

        counter++;

        if (counter < questions.length) {
            showQuestion(counter)
        }
        else {
            container.innerHTML = "Du har svarat på alla frågor.";
        }
});
}

nextButton ();


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