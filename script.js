//Frågorna
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
    options: ["Object", "Sträng", "Array", "Number"],
    values: [false, false, true, false],
    correctText: "Array",
    correctAnswer: true
},
{
    type: "trueFalse",
    question: "Ankademins frontendutbildning är 3 år lång",
    correctText: "Falskt",
    correctAnswer: false
},
{
    type: "check",
    question: "Vilka av dessa är programmeringsspråk?",
    options: ["JavaScript", "TypeScript", "HTML", "CSS"],
    values: [true, true, false, false],
    correctText: "JavaScript, TypeScript",
    correctAnswer: [true, true]
},
];
//Array som sparar input
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
    else if (questions[counter].type === "check") {
        showCheckQuestion (counter);
    }
}
function showMultiChoise () {
    container.innerHTML = `
        <h2>Fråga ${counter + 1}</h2>
        <h3> ${questions[counter].question} </h3>
        `;
    questions[counter].options.forEach((option, i) => {
        const value = questions[counter].values[i];
        container.innerHTML += `
        <label>
            <input type="radio" name="multiSvar" value="${value}"> ${option}
        </label>
        <br>
        `
        });
}

function showCheckQuestion () {
    container.innerHTML = `
        <h2>Fråga ${counter + 1}</h2>
        <h3> ${questions[counter].question} </h3>
        `
        questions[counter].options.forEach((option, i) => {
        const value = questions[counter].values[i];
        container.innerHTML += `
        <label>
            <input type="checkbox" name="checkSvar" value="${value}"> ${option}
        </label>
        <br>
    `;
        });
}

function nextButton () {
    document.querySelector("#nextBtn").addEventListener("click", () => {
    
        let selected;

        if (questions[counter].type === "trueFalse") {
            selected = document.querySelector('input[name="svar"]:checked'); 
            userAnswers[counter] = selected ? selected.value === "true": null;
        }
        else if (questions[counter].type === "multiChoise") {
            selected = document.querySelector('input[name="multiSvar"]:checked');
            userAnswers[counter] = selected ? selected.value === "true": null;
        }
        else if (questions[counter].type === "check") {
            let selectedElements = document.querySelectorAll('input[name="checkSvar"]:checked');

            let selectedValues = [];
            for (let i=0; i < selectedElements.length; i++){
                selectedValues.push(selectedElements[i].value === "true");
            }

            userAnswers[counter] = selectedValues.length > 0 ? selectedValues: null;
        }

        

        counter++;

        if (counter < questions.length) {
            showQuestion(counter);
        }
        else {
            container.innerHTML = "Du har svarat på alla frågor.";
        }
});
}

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

nextButton ();


document.querySelector("#checkBtn").addEventListener("click", () => {
    container.innerHTML = "";
    const resultList = document.querySelector(".result-list");
    let score = 0;
    for (i=0;i < questions.length; i++){

        const resultOption = document.createElement("li");
        resultList.appendChild(resultOption);

        const resultQuestion = document.createElement("p");
        resultQuestion.innerHTML = `Fråga ${i+1}: ${questions[i].question}`;
        resultOption.appendChild(resultQuestion);

        const resultAnswer = document.createElement("p");
        resultAnswer.innerHTML = `Rätt svar: ${questions[i].correctText}`;
        resultOption.appendChild(resultAnswer);

        const resultYourAnswer = document.createElement("p");
        
        const answer = userAnswers[i];

        if (questions[i].type === "check"){

            if (answer === null) {
                resultYourAnswer.innerHTML = "Du svarade tyvärr inte på frågan: + 0 poäng!"
            }
            else if (arraysEqual(answer, questions[i].correctAnswer)){
                resultYourAnswer.innerHTML = "Du svarade Rätt: + 1 poäng!"
                score++;
            }
            else {
            resultYourAnswer.innerHTML = "Du svarade tyvärr Fel: + 0 poäng!"
            }
            resultOption.appendChild(resultYourAnswer);
            
            }
            else {
                const correct = questions[i].correctAnswer;

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
    }
});