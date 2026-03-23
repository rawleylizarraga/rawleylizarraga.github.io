// event listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#signupForm").addEventListener("submit", function (event) {
    validateForm(event);
})
document.querySelector("#password").addEventListener("click", generatePassword);



// functions

// call the function to get list of states
getStates();

// display city from web api after entering zip code
async function displayCity() {
    // alert(document.querySelector("#zip").value);

    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);

    if (data) {
        document.querySelector("#zipError").innerHTML = "";
        document.querySelector("#city").innerHTML = data.city;
        document.querySelector("#latitude").innerHTML = data.latitude;
        document.querySelector("#longitude").innerHTML = data.longitude;
    } else {
        document.querySelector("#zipError").innerHTML = "Zip code not found";
        document.querySelector("#zipError").style.color = "red";
        document.querySelector("#city").innerHTML = "";
        document.querySelector("#latitude").innerHTML = "";
        document.querySelector("#longitude").innerHTML = "";
    }

}

// county retrieval from given state
// count list is temporarily locked while waiting for the list or if "Select One" is chosen
async function displayCounties() {
    let state = document.querySelector("#state").value;
    let countyList = document.querySelector("#county");

    countyList.innerHTML = "<option> Select County </option>";
    countyList.disabled = true;

    if (state == "Select One") {
        return;
    }

    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();

    countyList.innerHTML = "<option> Select County </option>";

    for (let i of data) {
        countyList.innerHTML += `<option> ${i.county} </option>`;
    }

    countyList.disabled = false;
}

// username availability checker
async function checkUsername() {
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let usernameError = document.querySelector("#usernameError");

    if (data.available) {
        usernameError.innerHTML = "Username available!";
        usernameError.style.color = "green";
    } else {
        usernameError.innerHTML = "Username taken";
        usernameError.style.color = "red";
    }
}

// validate the form
function validateForm(e) {
    let isValid = true;
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let passwordConfirm = document.querySelector("#passwordConfirm").value;

    // clear previous errors
    document.querySelector("#usernameError").innerHTML = "";
    document.querySelector("#passwordError").innerHTML = "";

    // check username length
    if (username.length == 0) {
        document.querySelector("#usernameError").innerHTML = "Username Required!";
        document.querySelector("#usernameError").style.color = "red";
        isValid = false;
    }

    // check passwword length
    if (password.length < 6) {
        document.querySelector("#passwordError").innerHTML = "Password must be at least 6 characters!";
        document.querySelector("#passwordError").style.color = "red";
        isValid = false;
    }

    // check password with repeat
    if (password != passwordConfirm) {
        document.querySelector("#passwordError").innerHTML = "Passwords do not match!";
        document.querySelector("#passwordError").style.color = "red";
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault();
    }
}

// generate suggested password when user clicks the password box
async function generatePassword() {
    if (document.querySelector("#suggestedPwd").innerHTML == "") {
        let url = "https://csumb.space/api/suggestedPassword.php?length=8";
        let response = await fetch(url);
        let data = await response.json();

        document.querySelector("#suggestedPwd").innerHTML = `Suggested password: ${data.password}`;
    }
}

// retieve list of states
async function getStates() {
    let url = "https://csumb.space/api/allStatesAPI.php";
    let response = await fetch(url);
    let data = await response.json();

    for (let i of data) {
        state.innerHTML += `<option value="${i.usps}"> ${i.state} </option>`;
    }
}