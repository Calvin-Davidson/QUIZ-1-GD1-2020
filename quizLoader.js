let QuizFiles = ["QuizVragen/quiz2.json", "QuizVragen/quiz1.json"]; // het JSON bestand met de quizz

function loadQuizPicker() {
    myQuestion.innerHTML = "Welke quiz wilt u doen?";
    let answers = [];
    for (let i = 0; i < QuizFiles.length; i++) {
        let answer = document.createElement('li');
        answer.className = "quizOption";
        answer.quizPath = QuizFiles[i];
        answer.innerHTML = "LOADING";
        setQuizName(QuizFiles[i], answer);
        answer.addEventListener('click', onClick, true)
        answers.push(answer);
    }

    answers = shuffleArray(answers);
    for (let i = 0; i < answers.length; i++) {
        myAnswer.appendChild(answers[i]);
    }
}

function onClick(evt) {
    askname(evt.target.quizPath);
}


function setQuizName(path, htmlObj) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                let data = JSON.parse(httpRequest.responseText);
                htmlObj.innerHTML = "Quiz: " + data.quizMetaData.title;
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

loadQuizPicker();