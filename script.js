//Funktion som visar rätt fråga baserat på vilken typ av fråga det är
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
//Funktion för hur sant eller falsk frågorna ska se ut
function showTrueFalse () {
    let container = document.querySelector(".question-container");
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
//Funktion för hur frågorna med flera alternativ ska se ut (radiobuttons)
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
//Funktion för hur frågorna med flera rätta svar ska se ut (checkbuttons)
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
//Funktion för hur "Nästa Fråga" knappen ska fungera
function nextButton () {
    document.querySelector("#nextBtn").addEventListener("click", () => {
        //Om användaren svarar så ska svaret sparas i en array som en boolean (true or false) annars sparas inget
        let selected;
        if (questions[counter].type === "trueFalse") {
            selected = document.querySelector('input[name="svar"]:checked'); 
            userAnswers[counter] = selected ? selected.value === "true": null;
        }
        else if (questions[counter].type === "multiChoise") {
            selected = document.querySelector('input[name="multiSvar"]:checked');
            userAnswers[counter] = selected ? selected.value === "true": null;
        }
        //Vid frågor med flera svar så sparas svaren som booleans i en array, och denna array sparas sedan som ett element i en annan array som sedan ska jämföras med det korrekta svaret
        else if (questions[counter].type === "check") {
            let selectedElements = document.querySelectorAll('input[name="checkSvar"]:checked');

            let selectedValues = [];
            for (let i=0; i < selectedElements.length; i++){
                selectedValues.push(selectedElements[i].value === "true");
            }
            userAnswers[counter] = selectedValues.length > 0 ? selectedValues: null;
        }

        counter++;
        //Så länge countern är mindre än antal frågor så fortsätter det att visas nya frågor när man klickar på knappen.
        if (counter < questions.length) {
            showQuestion(counter);
        }
        //När frågorna är slut får man ny upp en ny knapp för rättning
        else {
            container.innerHTML = "Du har svarat på alla frågor.";

            document.querySelector("#nextBtn").remove();
            
            let checkBtn = document.createElement("button");
            checkBtn.setAttribute("id", "checkBtn");
            checkBtn.innerHTML = "Se Resultat";
            document.body.appendChild(checkBtn);
            let score = 0;

            document.querySelector("#checkBtn").addEventListener("click", () => {
            correctQuiz();
            });
        }
});
}
//Funktion som jämför arrayen "userAnswer" som innehåller vårt svar för frågor med flera rätta svar, med facit.
function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
//Funktion som rättar våra frågor och visar resultat.
function correctQuiz (){
    checkBtn.remove();
    container.innerHTML = "";
    const resultList = document.querySelector(".result-list");
    let score = 0;
    //Skapar listan som innehåller frågan, rätt svar och om vi svarade rätt samt om vi fick poäng.
    for (i=0;i < questions.length; i++){

        const resultOption = document.createElement("li");
        resultList.appendChild(resultOption);
        resultOption.className = "resultOption";

        const resultQuestion = document.createElement("p");
        resultQuestion.innerHTML = `Fråga ${i+1}: ${questions[i].checkQuestion}`;
        resultOption.appendChild(resultQuestion);

        const resultAnswer = document.createElement("p");
        resultAnswer.innerHTML = `Rätt svar: ${questions[i].correctText}`;
        resultOption.appendChild(resultAnswer);

        const resultYourAnswer = document.createElement("p");
        const answer = userAnswers[i];
        
        if (questions[i].type === "check"){
            if (answer === null) {
                resultYourAnswer.innerHTML = "Du svarade tyvärr inte på frågan: + 0 poäng!";
            }
            else if (arraysEqual(answer, questions[i].correctAnswer)){
                resultYourAnswer.innerHTML = "Du svarade Rätt: + 1 poäng!";
                score++;
            }
            else {
            resultYourAnswer.innerHTML = "Du svarade tyvärr Fel: + 0 poäng!";
            }
            }
            else {
                const correct = questions[i].correctAnswer;

                if (answer === null) {
                    resultYourAnswer.innerHTML = "Du svarade tyvärr inte på frågan: + 0 poäng!";
                }
                else if (answer === correct){
                    resultYourAnswer.innerHTML = "Du svarade Rätt: + 1 poäng!";
                    score++;
                }
                else {
                resultYourAnswer.innerHTML = "Du svarade tyvärr Fel: + 0 poäng!";
                }
            }
            resultOption.appendChild(resultYourAnswer);
    }
    let scoreText = document.createElement("p");
    scoreText.className = "scoreText";
    if (score < 5){
        scoreText.innerHTML = `Underkänt! Du fick ${score}/10 poäng`;
        scoreText.style.color = "red";
    }
    else if (score < 8){
        scoreText.innerHTML = `Bra! Du fick ${score}/10 poäng`;
        scoreText.style.color = "orange";
    }
    else {
        scoreText.innerHTML = `Riktigt bra jobbat! Du fick ${score}/10 poäng`;
        scoreText.style.color = "green";
    }
    document.body.appendChild(scoreText);
}
//Funktion för lightmode och darkmode knappen
function lightMode () {
    let lightBtn = document.querySelector("#lightMode");
    let body = document.querySelector("body");
    let i = 0;
    lightBtn.addEventListener("click", () => {
        
        if ((i % 2) === 0){
            lightBtn.innerHTML = "Lightmode";
            body.style.backgroundColor = "#333";
            body.style.color = "white";
            //resultOption.className = "resultOption-darkMode"
        }
        else {
            lightBtn.innerHTML = "Darkmode";
            body.style.backgroundColor = "white";
            body.style.color = "black";
            //resultOption.className = "resultOption-lightMode"
        }
        i++;
    });
}
//Frågorna
const questions = [
{
    type: "trueFalse",
    question: "Ankademins frontendutbildning innehåller HTML, CSS och JavaScript.",
    checkQuestion: "Ankademins frontendutbildning innehåller HTML, CSS och JavaScript.",
    correctText: "Sant",
    correctAnswer: true
},
{
    type: "multiChoise",
    question: 'Vilken datatyp är ["äpple", "päron", "banan"] i JavaScript?',
    checkQuestion: 'Vilken datatyp är ["äpple", "päron", "banan"] i JavaScript?',
    options: ["Object", "Sträng", "Array", "Number"],
    values: [false, false, true, false],
    correctText: "Array",
    correctAnswer: true
},
{
    type: "trueFalse",
    question: "Ankademins frontendutbildning är 3 år lång",
    checkQuestion: "Ankademins frontendutbildning är 3 år lång",
    correctText: "Falskt",
    correctAnswer: false
},
{
    type: "check",
    question: "Vilka av dessa är programmeringsspråk?",
    checkQuestion: "Vilka av JavaScript, TypeScript, HTML och CSS är programmeringsspråk?",
    options: ["JavaScript", "TypeScript", "HTML", "CSS"],
    values: [true, true, false, false],
    correctText: "JavaScript, TypeScript",
    correctAnswer: [true, true]
},
{
    type: "trueFalse",
    question: "CSS används för att styla och layouta webbsidor.",
    checkQuestion: "CSS används för att styla och layouta webbsidor.",
    correctText: "Sant",
    correctAnswer: true
},
{
    type: "multiChoise",
    question: "Vilken metod används för att lägga till HTML-element dynamiskt via JavaScript?",
    checkQuestion: "Vilken metod av createElement(), newHTML(), addNode() eller makeElement() används för att lägga till HTML-element dynamiskt via JavaScript?",
    options: ["createElement()", "newHTML()", "addNode()", "makeElement()"],
    values: [true, false, false, false],
    correctText: "createElement()",
    correctAnswer: true
},
{
    type: "check",
    question: "Vilka av dessa är JavaScript-datatyper?",
    checkQuestion: "Vilka av String, Boolean, Float, Object är JavaScript-datatyper?",
    options: ["String", "Boolean", "Float", "Object"],
    values: [true, true, false, true],
    correctText: "String, Boolean, Object",
    correctAnswer: [true, true, true]
},
{
    type: "trueFalse",
    question: "En variabel i JavaScript kan inte ändra värde efter att den skapats.",
    checkQuestion: "En variabel i JavaScript kan inte ändra värde efter att den skapats.",
    correctText: "Falskt",
    correctAnswer: false
},
{
    type: "trueFalse",
    question: "CSS Flexbox används för att placera element i rader eller kolumner.",
    checkQuestion: "CSS Flexbox används för att placera element i rader eller kolumner.",
    correctText: "Sant",
    correctAnswer: true
},
{
    type: "multiChoise",
    question: "Vad betyder förkortningen HTML?",
    checkQuestion: "Vad betyder förkortningen HTML: HyperText Markup Language, Home Tool Markup Language, HyperText Markdown Language eller Human Text Machine Layout?",
    options: ["HyperText Markup Language", "Home Tool Markup Language", "HyperText Markdown Language", "Human Text Machine Layout"],
    values: [true, false, false, false],
    correctText: "HyperText Markup Language",
    correctAnswer: true
},
];
lightMode ();
//Array som sparar svarsinput
const userAnswers = [];
//Counter för att rätt objekt ska selectas
let counter = 0;
//deklarerar en container för frågorna
let container = document.querySelector(".question-container");
showQuestion();
nextButton ();