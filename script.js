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

            document.querySelector("#nextBtn").remove();
            
            let checkBtn = document.createElement("button");
            checkBtn.setAttribute("id", "checkBtn");
            checkBtn.innerHTML = "Rätta";
            document.body.appendChild(checkBtn);
            let score = 0;

            document.querySelector("#checkBtn").addEventListener("click", () => {
            correctQuiz();
            });
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
function correctQuiz (){
    checkBtn.remove();
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
    let scoreText = document.createElement("p");
    if (score < 5){
        scoreText.innerHTML = `Underkänt! Du fick ${score}/10 poäng`;
        scoreText.style.color = "red";
    }
    else if (5 < score < 8){
        scoreText.innerHTML = `Bra! Du fick ${score}/10 poäng`;
        scoreText.style.color = "orange";
    }
    else {
        scoreText.innerHTML = `Riktigt bra jobbat! Du fick ${score}/10 poäng`;
        scoreText.style.color = "green";
    }
    document.body.appendChild(scoreText);
}
function lightMode () {
    let lightBtn = document.querySelector(".lightMode");
    let body = document.querySelector("body");
    let i = 0;
    lightBtn.addEventListener("click", () => {
        
        if ((i % 2) === 0){
            lightBtn.innerHTML = "Lightmode";
            body.style.backgroundColor = "#333";
            body.style.color = "white";
        }
        else {
            lightBtn.innerHTML = "Darkmode";
            body.style.backgroundColor = "white";
            body.style.color = "black";
        }
        i++;
    });
}
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
{
    type: "trueFalse",
    question: "CSS används för att styla och layouta webbsidor.",
    correctText: "Sant",
    correctAnswer: true
},
{
    type: "multiChoise",
    question: "Vilken metod används för att lägga till HTML-element dynamiskt via JavaScript?",
    options: ["createElement()", "newHTML()", "addNode()", "makeElement()"],
    values: [true, false, false, false],
    correctText: "createElement()",
    correctAnswer: true
},
{
    type: "check",
    question: "Vilka av dessa är JavaScript-datatyper?",
    options: ["String", "Boolean", "Float", "Object"],
    values: [true, true, false, true],
    correctText: "String, Boolean, Object",
    correctAnswer: [true, true, true]
},
{
    type: "trueFalse",
    question: "En variabel i JavaScript kan inte ändra värde efter att den skapats.",
    correctText: "Falskt",
    correctAnswer: false
},
{
    type: "trueFalse",
    question: "CSS Flexbox används för att placera element i rader eller kolumner.",
    correctText: "Sant",
    correctAnswer: true
},
{
    type: "multiChoise",
    question: "Vad betyder förkortningen HTML?",
    options: ["HyperText Markup Language", "Home Tool Markup Language", "HyperText Markdown Language", "Human Text Machine Layout"],
    values: [true, false, false, false],
    correctText: "HyperText Markup Language",
    correctAnswer: true
},
];
lightMode ();
//Array som sparar input
const userAnswers = [];
let counter = 0;
let container = document.querySelector(".question-container");
showQuestion();
nextButton ();