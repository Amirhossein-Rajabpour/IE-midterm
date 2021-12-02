// This function takes response from server and shows the gender and probability for the given name
function displayGender(response) {
    console.log(response)
    document.getElementById("gender").innerHTML = response.gender;
    document.getElementById("probability").innerHTML = response.probability;
}

// This function saves the name in local storage
function saveName(){
    let name_user = document.getElementById("fname").value;
    console.log("saving name...")
    name_verified = checkName(name_user);
    if (checkName){
        if (document.getElementById("male-radio").checked){
            console.log("male")
            localStorage.setItem(name_user, "male");
            document.getElementById("saved").innerHTML = "male"
        }
        else{
            console.log("female")
            localStorage.setItem(name_user, "female");
            document.getElementById("saved").innerHTML = "female"
        }
    }
}

// This function clears the name from local storage
function clearName(){
    name_user = document.getElementById("fname").value;
    localStorage.removeItem(name_user);
    console.log("clearing...")  
    document.getElementById("saved").innerHTML = ""
}

// This function check if we have the name in local storage and if we have it, it shows it
function checkLocalStorage(name){
    if (typeof(Storage) !== "undefined") {
        console.log("fetching from local storage...")
        console.log("new name is")
        state = localStorage.getItem(name);
        console.log(state)
        document.getElementById("saved").innerHTML = localStorage.getItem(name);
      } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
      }
}

// This function checks the input. it should only include letters and should be up to 255 letters
function checkName(name){
    var myRegxp = /^[A-Za-z ]{1,255}$/;
    if(myRegxp.test(name) == false){
        console.log("error")
        alert("Error!")
        return false;
    }
    else{
        return true;
    }
}

// This function takes the name and checks it (length and letters) and then check local storage and also calls the function that sends the request
function getName(){
    event.preventDefault();
    let name_user = document.getElementById("fname").value;

    name_verified = checkName(name_user);
    console.log(name_verified)

    if (name_verified){
        checkLocalStorage(name_user);
        sendRequest(name_user);
    }
}

// This function sends the request to webserver and convert response to json and then calls another function that displays the response
function sendRequest(inputName){
    let request = "https://api.genderize.io/?name=" + inputName
    fetch(request)
    .then(response => response.json())
    .then(response => displayGender(response))
}
