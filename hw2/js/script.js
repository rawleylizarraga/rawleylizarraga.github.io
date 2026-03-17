// Event Listeners
document.querySelector("button").addEventListener("click", gradeQuiz)

// Global Variables
let score = 0;
let attempts = localStorage.getItem("total_attempts");

let validationFdbk = document.querySelector("#validationFdbk");

displayQ4Choices();
displayQ8Choices();
displayQ10Choices();


// Functions
function displayQ4Choices() {
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);

    for (let i = 0; i < q4ChoicesArray.length; i++) {
        document.querySelector("#q4Choices").innerHTML += ` <input type="radio" name="q4" id="${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]} </label>`
    }
}

function displayQ8Choices() {
    let q8ChoicesArray = ["California", "New York", "Wyoming", "Massachusetts"];
    q8ChoicesArray = _.shuffle(q8ChoicesArray);

    for (let i = 0; i < q8ChoicesArray.length; i++) {
        document.querySelector("#q8Choices").innerHTML += ` <input type="radio" name="q8" id="${q8ChoicesArray[i]}" value="${q8ChoicesArray[i]}"> <label for="${q8ChoicesArray[i]}"> ${q8ChoicesArray[i]} </label>`
    }
}

function displayQ10Choices() {
    let q10ChoicesArray = ["Alaska", "Texas", "New Mexico", "Florida"];
    q10ChoicesArray = _.shuffle(q10ChoicesArray);

    for (let i = 0; i < q10ChoicesArray.length; i++) {
        document.querySelector("#q10Choices").innerHTML += ` <input type="radio" name="q10" id="${q10ChoicesArray[i]}" value="${q10ChoicesArray[i]}"> <label for="${q10ChoicesArray[i]}"> ${q10ChoicesArray[i]} </label>`
    }
}

function isFormValid() {
    let isValid = true;

    if (document.querySelector("#q1").value == "") {
        validationFdbk.innerHTML += "Question 1 was not answered<br>";
        isValid = false;
    }

    if (document.querySelector("#q2").value == "") {
        validationFdbk.innerHTML += "Question 2 was not answered<br>";
        isValid = false;
    }

    if (!document.querySelector("#Jefferson").checked && !document.querySelector("#Roosevelt").checked && !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked) {
        validationFdbk.innerHTML += "Question 3 was not answered<br>";
        isValid = false;
    }

    if (!document.querySelector("input[name=q4]:checked")) {
        validationFdbk.innerHTML += "Question 4 was not answered<br>";
        isValid = false;
    }

    if (!document.querySelector("#q5Hawaii").checked && !document.querySelector("#q5Alaska").checked && !document.querySelector("#q5Texas").checked && !document.querySelector("#q5Idaho").checked) {
        validationFdbk.innerHTML += "Question 5 was not answered<br>";
        isValid = false;
    }

    if (document.querySelector("#q6").value == "") {
        validationFdbk.innerHTML += "Question 6 was not answered<br>";
        isValid = false;
    }

    if (document.querySelector("#q7").value == "") {
        validationFdbk.innerHTML += "Question 7 was not answered<br>";
        isValid = false;
    }

    if (!document.querySelector("input[name=q8]:checked")) {
        validationFdbk.innerHTML += "Question 8 was not answered<br>";
        isValid = false;
    }

    if (document.querySelector("#q9").value == "") {
        validationFdbk.innerHTML += "Question 9 was not answered<br>";
        isValid = false;
    }

    if (!document.querySelector("input[name=q10]:checked")) {
        validationFdbk.innerHTML += "Question 10 was not answered<br>";
        isValid = false;
    }


    return isValid;
}

function rightAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='Checkmark'>";
    score += 10;
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
        console.log("Quiz invalid.");
        return;
    }

    score = 0;

    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q4Response = document.querySelector("input[name=q4]:checked").value;
    console.log(q1Response);
    console.log(q2Response);
    console.log(q4Response);

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

    // grade question 3
    if (document.querySelector("#Jefferson").checked && document.querySelector("#Roosevelt").checked && !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked) {
        rightAnswer(3);
    } else {
        wrongAnswer(3);
    }

    // grade question 4
    if (q4Response == "Rhode Island") {
        rightAnswer(4);
    } else {
        wrongAnswer(4);
    }

    // grade question 5
    if (document.querySelector("#q5Hawaii").checked && document.querySelector("#q5Alaska").checked && !document.querySelector("#q5Texas").checked && !document.querySelector("#q5Idaho").checked) {
        rightAnswer(5);
    } else {
        wrongAnswer(5);
    }

    // grade question 6
    if (document.querySelector("#q6").value.toLowerCase() == "washington") {
        rightAnswer(6);
    } else {
        wrongAnswer(6);
    }

    // grade question 7
    if (document.querySelector("#q7").value == "q7Oregon") {
        rightAnswer(7);
    } else {
        wrongAnswer(7);
    }

    // grade question 8
    if (document.querySelector("input[name=q8]:checked").value == "California") {
        rightAnswer(8);
    } else {
        wrongAnswer(8);
    }

    // grade question 9
    if (document.querySelector("#q9").value == "50") {
        rightAnswer(9);
    } else {
        wrongAnswer(9);
    }

    // grade question 10
    if (document.querySelector("input[name=q10]:checked").value == "Alaska") {
        rightAnswer(10);
    } else {
        wrongAnswer(10);
    }


    document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;

    // change score display based on score
    if (score < 80) {
        document.querySelector("#totalScore").className = "text-danger";
    } else if (score > 80) {
        document.querySelector("#totalScore").className = "text-success";
        document.querySelector("#totalScore").innerHTML += " - Congratulations!";
    } else {
        document.querySelector("#totalScore").className = "text-success";
    }

    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
    localStorage.setItem("total_attempts", attempts);
}