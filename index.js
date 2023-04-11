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
function saveData(/** @type {Event} */ e) {
  console.log(e.target);
  // grab schedule note and date time, time in on .schedul-item ancentor
  const ancestor = e.target.closest(".schedule-item");
  const dateTime = ancestor.getAttribute("data-date-time");
  const note = ancestor.querySelector("input").value;
  console.log({ dateTime, note });
  // saves to local storage
  getSaveLocalStoragee({ dateTime, note });
}

const itemInput = document.querySelector("input[type=text]");

// itemInput.addEventListener("input", saveData);

function myEvent(e) {
  console.log(e.target.value);
  document.querySelector(".container").innerText = e.target.value;
}

function getScheduleElements() {
  return [...document.querySelectorAll(".schedule-item").values()];
}
// var answer = localStorage.key(1);

// check time
// var time = dayjs().format("H");
// document.getElementById("time").innerText = time;

// var time = today.getHours();

// function today {
//     for (today.getHours() < 10) {

//     var passed = document.createElement('style')
//     passed.innerHTML = "div {background-color:red;}";
//     document.body.appendChild(passed);
//     document.querySelector("container0")
//     }
// }

// storage

// check if time is past
// isPast funct() {
//     time =
// }

// if (time == CurrentTime) {

// }

function getExpiredElements(/** @type {dayjs} */ currentTimeNow) {
  //expired elements have a time<current time
  // find the elements .schedule-item
  const scheduleElements = getScheduleElements();

  const expiredElements = scheduleElements.filter((item) => {
    return isElementExpired(item, currentTimeNow);
  });

  return expiredElements;
}

function isElementExpired(item, currentTimeNow) {
  const scheduleDateTime = getScheduleDateTime(item, currentTimeNow);
  const isExpired = scheduleDateTime.isBefore(currentTimeNow);
  return isExpired;
}

function getScheduleDateTime(item, currentTimeNow) {
  const [hourStr, cycleAmPm /** pm|am */] = item
    .querySelector("label")
    .textContent.trim()
    .split(" ");

  const timeStr =
    parseInt(hourStr) +
    (cycleAmPm === "pm" && hourStr < 12 ? 12 : 0) +
    ":00:00"; // hh:00:00
  const scheduleDateTime = dayjs(
    currentTimeNow.format("YYYY-MM-DD ") + timeStr
  );
  console.log("calculate datetime", {
    hourStr,
    cycleAmPm,
    timeStr,
    formtted: scheduleDateTime.format(),
  });
  return scheduleDateTime;
}

function strikeOut(/** @type {HTMLElement[]} */ expiredSchedulElements) {
  // todo add expired schedule-expired
  expiredSchedulElements.map((item) => item.classList.add("schedule-expired"));
}

function attachDateTimeToSchedules(
  elements = getScheduleElements(),
  currentTimeNow = dayjs()
) {
  const storedTimesFromLocalStorage = getSaveLocalStoragee();
  elements.map((item) => {
    //attach the date time as an html attribute
    const dateTime = getScheduleDateTime(item, currentTimeNow);
    // sets an attribute to data date time 
    item.setAttribute("data-date-time", dateTime.format());

    // targeting date and time above container
    const floatDateTime = document.createElement("div");
    // variable 
    floatDateTime.textContent = dateTime.format();
    //adds a class after button on div schedule float label
    floatDateTime.classList.add("schedule-float-label");
    item.append(floatDateTime);

    const note = storedTimesFromLocalStorage[dateTime.format()];
    if (note) {
      item.querySelector("input").value = note;
    }
  });
}

function getSaveLocalStoragee(
  /** @type {{dateTime,note}} */ saveNewValue,
  newStoreValue
) {
  let schedule = JSON.parse(localStorage.getItem("saved-schedules") ?? "{}");

  if (saveNewValue) {
    //save it to th store
    schedule[saveNewValue.dateTime] = saveNewValue.note;

    //write to localStorage
    localStorage.setItem("saved-schedules", JSON.stringify(schedule));
  }

  if (newStoreValue) {
    schedule = newStoreValue;
    localStorage.setItem("saved-schedules", JSON.stringify(schedule));
  }

  return schedule;
}

function resetStore() {
  getSaveLocalStoragee(null, {});
  attachDateTimeToSchedules();
  //clear inputs
  getScheduleElements().map((item) => (item.querySelector("input").value = ""));
}

//called when the page is loaded
attachDateTimeToSchedules();
//on load
strikeOut(getExpiredElements(dayjs()));
