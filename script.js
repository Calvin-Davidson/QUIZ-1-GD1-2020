const delayTime = 1000; // wachttijd voor de volgende vraag
const myQuestion = document.getElementById('myQuestion');
const myAnswer = document.getElementById('myAnswer');
const quizWrapper = document.getElementById('quizWrapper');
const questionBox = document.getElementById('questionBox');
const resultBox = document.getElementById('resultBox');

let Questions;
let quizJsonFile = "QuizVragen/quiz2.json"; // het JSON bestand met de quizz

let counter = 0;
let quiz;
let playerData = {}; // object, hierin worden de game gegevens opgeslagen

let hasAnswered = false;

let VragenVolgorde = [];

function init(){
  Questions = getAllQuestions();
  // haal de data op met AJAX
  makeAjaxCall (quizJsonFile, "GET").then(handleReceivedData); // doe het! wacht op promise
  function handleReceivedData(jsonString){ // pak de data aan
    quiz = JSON.parse(jsonString);
    //console.log(quiz); // debug
    initQuiz(); // start de quiz
  }
}

function initQuiz(){
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

function prepareQuestions() {
  hasAnswered = false;
  questionBox.className = "questionBox-new";

  quizWrapper.style.backgroundImage = "url("+ quiz.quizMetaData.imageURI; + ")";

  if (counter < VragenVolgorde.length) {
    myQuestion.innerHTML = quiz.quizContent[VragenVolgorde[counter]].question;
    myAnswer.innerHTML = "";
    for (let i = 0; i < quiz.quizContent[VragenVolgorde[counter]].answers.length; i++) {

      let answer = document.createElement('li');
      answer.className = "answer";
      answer.score = quiz.quizContent[VragenVolgorde[counter]].answers[i].feedback;
      answer.innerHTML = quiz.quizContent[VragenVolgorde[counter]].answers[i].answer;

      myAnswer.appendChild(answer);
      myAnswer.addEventListener('click', evaluate, true)
    }
  } else {
    finishQuiz();
  }
}

function evaluate(evt) {
  if (hasAnswered) return;
  if (evt.target.className === "myAnswer") return;

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
  hasAnswered = true;

  myAnswer.innerHTML = "";
  myQuestion.innerHTML = "results";

  let answer1 = document.createElement('li');
  answer1.className = "Result";
  answer1.innerHTML = "Name: " + playerData.name;

  let answer2 = document.createElement('li');
  answer2.className = "Result";
  answer2.innerHTML = "Goede antwoorden: " + playerData.goodAnswers;

  let answer3 = document.createElement('li');
  answer3.className = "Result";
  answer3.innerHTML = "foute antwoorden: " + playerData.wrongAnswers;

  myAnswer.appendChild(answer1);
  myAnswer.appendChild(answer2);
  myAnswer.appendChild(answer3);
}

init();

