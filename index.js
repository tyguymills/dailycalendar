// current time
// table to write things
// save function
// background is red when it's past the time



// document.getElementById("date").innerText += "data";

// document.getElementById("date").innerText += "data";
// document.getElementById("9am").innerText += "data";
// document.getElementById("10am").innerText += "data";
// document.getElementById("11am").innerText += "data";
// document.getElementById("12pm").innerText += "data";
// document.getElementById("1pm").innerText += "data";
// document.getElementById("2pm").innerText += "data";
// document.getElementById("1pm").innerText += "data";
// document.getElementById("4pm").innerText += "data";
// document.getElementById("5pm").innerText += "data";



// display current date
var currentDate = dayjs().format("dddd, MMMM D");
document.getElementById("currentDate").innerText = currentDate;



// local storage - use stringify
function saveData(e) {
    console.log(e.target)
    // var task = getElementById(e)
}
// const button = document.querySelector(".btn");

// button.addEventListener("click", buttonClick);

const itemInput = document.querySelector("input[type=text]");

itemInput.addEventListener("input", saveData);

function myEvent(e) {
  console.log(e.target.value);
  document.querySelector(".container").innerText = e.target.value;
}







// var answer = localStorage.key(1);




// check time
// var time = dayjs().format("H");
// document.getElementById("time").innerText = time;

var time = today.getHours();

function today {
    for (today.getHours() < 10) {
    
    var passed = document.createElement('style')
    passed.innerHTML = "div {background-color:red;}";
    document.body.appendChild(passed);
    document.querySelector("container0")
    }
}






// storage




// check if time is past
// isPast funct() {
//     time =
// }

// if (time == CurrentTime) {

// }

