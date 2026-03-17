// Event Listeners
document.querySelector("button").addEventListener("click", gradeQuiz)

// Global Variables
let score = 0;

let validationFdbk = document.querySelector("#validationFdbk");


// Functions
function isFormValid() {
    let isValid = true;

    if (document.querySelector("#q1").value == "") {
        validationFdbk.innerHTML = "Question 1 was not answered";
    }

    return isValid;
}

function rightAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='Checkmark'>";
    score += 20;
}

function wrongAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='xmark'>";
}

function gradeQuiz() {
    console.log("Grading quiz...");
    validationFdbk.innerHTML = "";

    if (!isFormValid()) {
        return;
    }

    score = 0;

    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    console.log(q1Response);
    console.log(q2Response);

    // grade question 1
    if (q1Response == "sacramento") {
        rightAnswer(1);
    } else {
        wrongAnswer(1);
    }

    // grade question 2
    if (q2Response == "mo") {
        rightAnswer(2);
    } else {
        wrongAnswer(2);
    }


    document.querySelector("#totalScore").innerHTML = `Total Score ${score}`;
}