// event listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);

// functions

// display city from web api after entering zip code
async function displayCity() {
    // alert(document.querySelector("#zip").value);

    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);

    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#latitude").innerHTML = data.latitude;
    document.querySelector("#longitude").innerHTML = data.longitude;
}

async function displayCounties() {
    let state = document.querySelector("#state").value;
    let countyList = document.querySelector("#county");

    if (state == "Select One") {
        countyList.innerHTML = "<option> Select County </option>";
        countyList.disabled = true;
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