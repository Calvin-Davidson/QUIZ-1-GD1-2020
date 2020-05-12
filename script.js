const delayTime = 1000; // wachttijd voor de volgende vraag
const myQuestion = document.getElementById('myQuestion');
const myAnswer = document.getElementById('myAnswer');
const quizWrapper = document.getElementById('quizWrapper');
const questionBox = document.getElementById('questionBox');
const resultBox = document.getElementById('resultBox');

let quizJsonFile = "QuizVragen/quiz2.json"; // het JSON bestand met de quizz

let counter = 0;
let quiz;
let playerData = {}; // object, hierin worden de game gegevens opgeslagen

let hasAnswered = false;

let VragenVolgorde = [];

function init() {
    makeAjaxCall(quizJsonFile, "GET").then(handleReceivedData); // doe het! wacht op promise
    function handleReceivedData(jsonString) { // pak de data aan
        quiz = JSON.parse(jsonString);
        //console.log(quiz); // debug
        initQuiz(); // start de quiz
    }
}

// Reset de score van hiervoor, en shuffeld de vragenlijst.
function initQuiz() {
    // reset alle player game variabelen
    playerData.goodAnswers = 0;
    playerData.wrongAnswers = 0;
    playerData.name = prompt("wat is uw naam?"); // toekomstige uitbreiding naam speler opvragen

    VragenVolgorde = [];

    for (let i = 0; i < quiz.quizContent.length; i++) {
        VragenVolgorde.push(i);
    }
    VragenVolgorde = shuffleArray(VragenVolgorde);

    resultBox.style.display = "none"; // verberg de resultbox
    prepareQuestions(); // start de quiz
}

// laat de vraag en de lijst zien.
function prepareQuestions() {
    if (counter < VragenVolgorde.length) {

        hasAnswered = false;
        questionBox.className = "questionBox-new";

        quizWrapper.style.backgroundImage = "url(" + quiz.quizMetaData.imageURI + ")";
        myQuestion.innerHTML = quiz.quizContent[VragenVolgorde[counter]].question;
        myAnswer.innerHTML = "";

        let answers = [];
        for (let i = 0; i < quiz.quizContent[VragenVolgorde[counter]].answers.length; i++) {

            let answer = document.createElement('li');
            answer.className = "answer";
            answer.score = quiz.quizContent[VragenVolgorde[counter]].answers[i].feedback;
            answer.innerHTML = quiz.quizContent[VragenVolgorde[counter]].answers[i].answer;
            answer.addEventListener('click', evaluate, true)
            answers.push(answer);
        }

        answers = shuffleArray(answers);
        for (let i = 0; i < answers.length; i++) {
            myAnswer.appendChild(answers[i]);
        }

    } else {
        finishQuiz();
    }
}

// Kijkt of het gegeven antwoord goed of fout is.
function evaluate(evt) {
    if (hasAnswered) return;

    if (evt.target.score) {
        evt.target.className = "right";
        playerData.goodAnswers += 1; // increase good score
    } else {
        evt.target.className = "wrong";
        playerData.wrongAnswers += 1; // increase wrong score
    }
    counter++;
    questionBox.className = "questionBox";

    hasAnswered = true;
    setTimeout(prepareQuestions, delayTime);
}


// word getriggerd wanneer de quiz af is.
function finishQuiz() {
    myAnswer.innerHTML = "";
    myQuestion.innerHTML = "results";

    let Name = document.createElement('li');
    Name.className = "Result";
    Name.innerHTML = "Name: " + playerData.name;

    let GoodPoints = document.createElement('li');
    GoodPoints.className = "Result";
    GoodPoints.innerHTML = "Goede antwoorden: " + playerData.goodAnswers;

    let WrongPoints = document.createElement('li');
    WrongPoints.className = "Result";
    WrongPoints.innerHTML = "foute antwoorden: " + playerData.wrongAnswers;

    myAnswer.appendChild(Name);
    myAnswer.appendChild(GoodPoints);
    myAnswer.appendChild(WrongPoints);
}

init();

