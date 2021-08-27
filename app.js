// setup a listener for "enter"?
// record name
// new date
// change light for boys room or girls room
// setup a body click listener to focus on the text box
// const goto = require('./students.js');

// const runTimer = setInterval(updateTime, 60000);

const boysRoom = document.getElementById('boys-room');
const girlsRoom = document.getElementById('girls-room');
const boysRoomStatus = document.getElementById('boys-room-status');
const girlsRoomStatus = document.getElementById('girls-room-status');
const nameEntry = document.getElementById('card-scan-box');

var todaysDate = new Date().toLocaleDateString('en-US');
var boysTimeOut, girlsTimeOut;
var boysOccupant = '';
var girlsOccupant = '';
var dailyLog;

nameEntry.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') bathroomStatus(e);
});

document.getElementById('app-container').addEventListener('mouseup', () => {
  nameEntry.focus();
}, true);

function bathroomStatus (e) {

  if (todaysDate !== new Date().toLocaleDateString('en-US')) {
    todaysDate = new Date().toLocaleDateString('en-US');
    loadLog();
  }

  if (goto.boysRoom.indexOf(e.target.value) >= 0) {
    if (boysOccupant === '') {
      boysRoom.classList.add('occupied');
      boysTimeOut = Date.now();
      boysOccupant = e.target.value;
  
      var logout = document.createElement('p');
      logout.innerHTML = boysOccupant;
  
      var time = document.createElement('p');
      time.innerHTML = 'Time out: <1min';
  
      boysRoomStatus.appendChild(logout);
      boysRoomStatus.appendChild(time);

      if (!dailyLog[todaysDate][boysOccupant]) {
        dailyLog[todaysDate][boysOccupant] = {
          time : [],
          count : 0
        }
      }
      e.target.value = '';
      boysTime(time, boysTimeOut, boysOccupant);

    } else if (boysOccupant == e.target.value) {
      dailyLog[todaysDate][boysOccupant].time.push([
        new Date(boysTimeOut).toLocaleTimeString('en-US'),
        Math.floor((Date.now() - boysTimeOut) / 60000)
      ]);
      dailyLog[todaysDate][boysOccupant].count++;
      while (boysRoomStatus.firstChild) {
        boysRoomStatus.firstChild.remove();
      }
      boysOccupant = '';
      boysRoom.classList.remove('occupied');
      e.target.value = '';
      saveLog();
    }
  } else if (goto.girlsRoom.indexOf(e.target.value) >= 0) {
    if (girlsOccupant === '') {
      girlsRoom.classList.add('occupied');
      girlsTimeOut = Date.now();
      girlsOccupant = e.target.value;
  
      var logout = document.createElement('p');
      logout.innerHTML = girlsOccupant;
  
      var time = document.createElement('p');
      time.innerHTML = 'Time out: <1min';
  
      girlsRoomStatus.appendChild(logout);
      girlsRoomStatus.appendChild(time);

      if (!dailyLog[todaysDate][girlsOccupant]) {
        dailyLog[todaysDate][girlsOccupant] = {
          time : [],
          count : 0
        }
      }
      e.target.value = '';
      girlsTime(time, girlsTimeOut, girlsOccupant);


    } else if (girlsOccupant == e.target.value) {
      dailyLog[todaysDate][girlsOccupant].time.push([
        new Date(girlsTimeOut).toLocaleTimeString('en-US'),
        Math.floor((Date.now() - girlsTimeOut) / 60000)
      ]);
      dailyLog[todaysDate][girlsOccupant].count++;
      while (girlsRoomStatus.firstChild) {
        girlsRoomStatus.firstChild.remove();
      }
      girlsOccupant = '';
      girlsRoom.classList.remove('occupied');
      e.target.value = '';
      saveLog();
    }
  } else {
    // alert: student is not registered
  }
}

function boysTime(elem, startTime, student) {
  var timer = setInterval(function() {
    (function(elem, startTime, student) {
      if (student !== boysOccupant) clearInterval(timer);
      let time = Math.floor((Date.now() - startTime) / 60000);
      elem.innerHTML = (time === 1) ? `Time out: 1min` : `Time out: ${time}mins`;
    })(elem, startTime, student)}, 60000);
}

function girlsTime(elem, startTime, student) {
  var timer = setInterval(function() {
    (function(elem, startTime, student) {
      if (student !== girlsOccupant) clearInterval(timer);
      let time = Math.floor((Date.now() - startTime) / 60000);
      elem.innerHTML = (time === 1) ? `Time out: 1min` : `Time out: ${time}mins`;
    })(elem, startTime, student)}, 60000);
}

(function loadLog() {
  if (localStorage.dailyLog) {
    dailyLog = JSON.parse(localStorage.dailyLog);
  } else {
    dailyLog = {};
  }
  if (!Object.keys(dailyLog).includes(todaysDate)) {
    dailyLog[todaysDate] = {};
    saveLog();
  }
})();

function saveLog() {
  localStorage.setItem('dailyLog', JSON.stringify(dailyLog));
}
