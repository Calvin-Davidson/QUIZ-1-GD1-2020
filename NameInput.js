
function askname(QuizPath) {
    myQuestion.innerHTML = "Wat is uw naam?";
    myAnswer.innerHTML = "";
    let NameInput = document.createElement('li');
    NameInput.className = "inputField";
    NameInput.innerHTML = '<input type="text" id="NameInput" value="uw naam"><br><br>';

    NameInput.addEventListener('keypress', function (e) {
        if (e.keyCode == 13) {
            Continue();
        }
    });
    NameInput.addEventListener("click", function (e) {
        if (document.getElementById("NameInput").value == "uw naam") {
            document.getElementById("NameInput").value = "";
        }
    })


    let Submit = document.createElement('li');
    Submit.className = "submitName";
    Submit.innerHTML = '<button type="button" id="submitName">Start quiz</button>';

    Submit.addEventListener('click', function () {
        Continue();
    })
    myAnswer.appendChild(NameInput);
    myAnswer.appendChild(Submit);

    function Continue() {
        if (document.getElementById("NameInput").value == "üw naam") {
            playerData.name = "unknown";
        } else {
            playerData.name = document.getElementById("NameInput").value;
        }


        init(QuizPath);
    }

}
