// event listeners
document.querySelector("#searchForm").addEventListener("submit", function (event) {
    submitSearch(event);
})
document.querySelector("#previous").addEventListener("click", previousResult);
document.querySelector("#next").addEventListener("click", nextResult);
document.querySelector("#resetBtn").addEventListener("click", resetForm);

// variables
// using https://www.omdbapi.com/  with a free key
let apiKey = "a41681b2";
let pageNumber = 0;
let data;

// functions

// validate input and perform fetch
async function submitSearch(e) {
    // stop page from refreshing
    e.preventDefault();

    resetResults();

    if (document.querySelector("#qtitle").value == "") {
        document.querySelector("#errorMsg").innerHTML = "Error: Please enter a title";
        return;
    }

    let title = document.querySelector("#qtitle").value;
    let year = document.querySelector("#qyear").value;
    let type = document.querySelector("input[name='type']:checked").value;

    console.log(`Title=${title}`);
    console.log(`Year=${year}`);
    console.log(`Type=${type}`);

    let url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${title}&y=${year}&type=${type}`;
    let response = await fetch(url);
    data = await response.json();

    console.log(data);

    if (data.Response == "False") {
        document.querySelector("#errorMsg").innerHTML = `Error: ${data.Error}`;
        return;
    }

    updateResult();

    console.log(data.Search.length);
    document.querySelector("#rAmount").innerHTML = `${pageNumber + 1}/${data.Search.length}`;

    buttonCheck();
}

// navigate to previous result
function previousResult() {
    if (pageNumber > 0) {
        pageNumber--;
        updateResult();

        buttonCheck();
    }
}

// navigate to next result
function nextResult() {
    if (pageNumber < data.Search.length - 1) {
        pageNumber++;
        updateResult();

        buttonCheck();
    }
}

// update the results from stored data
function updateResult() {
    // clear the result display first incase something breaks
    document.querySelector("#rTitle").innerHTML = "";
    document.querySelector("#rYear").innerHTML = "";
    document.querySelector("#rType").innerHTML = "";
    document.querySelector("#rPoster").innerHTML = "";

    document.querySelector("#rTitle").innerHTML = "Title: " + data.Search[pageNumber].Title;
    document.querySelector("#rYear").innerHTML = "Year: " + data.Search[pageNumber].Year;
    document.querySelector("#rType").innerHTML = "Media Type: " + data.Search[pageNumber].Type;
    document.querySelector("#rPoster").innerHTML = `<img src=${data.Search[pageNumber].Poster} width="300" height="450">`;
    document.querySelector("#rAmount").innerHTML = `${pageNumber + 1}/${data.Search.length}`;
    document.querySelector("#rAmount").hidden = false;


    document.querySelector("#previous").hidden = false;
    document.querySelector("#next").hidden = false;

    document.querySelector("#disclaimer").hidden = false;

    //if (data.totalResults >= 1) {
        if (data.totalResults >= 10) {
            document.querySelector("#resultMsg").innerHTML = `${data.totalResults} results found, top ${data.Search.length} displayed.`
        } else {
            document.querySelector("#resultMsg").innerHTML = `${data.totalResults} results found.`
        }
    //}

}

// check if either of the buttons should be disabled due to reaching edge
function buttonCheck() {
    if (pageNumber < data.Search.length - 1) {
        document.querySelector("#next").disabled = false;
    } else {
        document.querySelector("#next").disabled = true;
    }
    if (pageNumber > 0) {
        document.querySelector("#previous").disabled = false;
    } else {
        document.querySelector("#previous").disabled = true;
    }
}

// clear the results and reset page number
function resetResults() {
    document.querySelector("#errorMsg").innerHTML = "";

    document.querySelector("#rTitle").innerHTML = "";
    document.querySelector("#rYear").innerHTML = "";
    document.querySelector("#rType").innerHTML = "";
    document.querySelector("#rPoster").innerHTML = "";

    pageNumber = 0;

    document.querySelector("#previous").hidden = true;
    document.querySelector("#next").hidden = true;
    document.querySelector("#rAmount").hidden = true;

    document.querySelector("#disclaimer").hidden = true;

    document.querySelector("#resultMsg").innerHTML = "";
}

// reset form inputs and results
function resetForm() {
    resetResults();

    document.querySelector("#qtitle").value = "";
    document.querySelector("#qyear").value = "";
    document.getElementById("searchForm").reset();
}