// Event Listeners
document.querySelector("button").addEventListener("click", gradeQuiz)

// Global Variables
let validationFdbk = document.querySelector("#validationFdbk");
let q1Feedback = document.querySelector("#q1Feedback");
let markImg1 = document.querySelector("#markImg1");


// Functions
function isFormValid() {
    let isValid = true;

    if (document.querySelector("#q1").value == "") {
        validationFdbk.innerHTML = "Question 1 was not answered";
    }

    return isValid;
}

function gradeQuiz() {
    console.log("Grading quiz...");
    validationFdbk.innerHTML = "";

    if (!isFormValid()) {
        return;
    }

    let score = 0;

    let q1Response = document.querySelector("#q1").value.toLowerCase();
    console.log(q1Response);

    // grade question 1
    if (q1Response == "sacramento") {
        q1Feedback.innerHTML = "Correct!";
        q1Feedback.className = "bg-success text-white";
        markImg1.innerHTML = "<img src='img/checkmark.png' alt='Checkmark'";
        score += 20;
    } else {
        q1Feedback.innerHTML = "Incorrect!";
        q1Feedback.className = "bg-warning text-white";
        markImg1.innerHTML = "<img src='img/xmark.png' alt='xmark'";
    }

    document.querySelector("#totalScore").innerHTML = `Total Score ${score}`;
}