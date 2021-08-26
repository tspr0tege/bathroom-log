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

var boysTimeOut, girlsTimeOut;
var boysOccupant = '';
var girlsOccupant = '';

nameEntry.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') bathroomStatus(e);
});

document.getElementById('container').addEventListener('mouseup', () => {
  nameEntry.focus();
}, true);

function bathroomStatus (e) {
  console.log(e.target.value)
  if (goto.boysRoom.indexOf(e.target.value) >= 0) {
    if (boysOccupant === '') {
      boysRoom.classList.add('occupied');
      boysTimeOut = Date.now();
      boysOccupant = e.target.value;
  
      var logout = document.createElement('p');
      logout.innerHTML = boysOccupant;
  
      var time = document.createElement('p');
      // time.id = 'boy-out';
      time.innerHTML = '<1min';
  
      boysRoomStatus.appendChild(logout);
      boysRoomStatus.appendChild(time);

      updateTime(time, boysTimeOut);


    } else if (boysOccupant == e.target.value) {
      while (boysRoomStatus.firstChild) {
        boysRoomStatus.removeChild(boysRoomStatus.firstChild);
      }
      boysOccupant = '';
      boysRoom.classList.remove('occupied');
    }
  } else if (goto.girlsRoom.indexOf(e.target.value) >= 0) {
    if (girlsOccupant === '') {
      girlsRoom.classList.add('occupied');
      girlsTimeOut = Date.now();
      girlsOccupant = e.target.value;
  
      var logout = document.createElement('p');
      logout.innerHTML = girlsOccupant;
  
      var time = document.createElement('p');
      // time.id = 'boy-out';
      time.innerHTML = '<1min';
  
      girlsRoomStatus.appendChild(logout);
      girlsRoomStatus.appendChild(time);

      updateTime(time, girlsTimeOut);


    } else if (girlsOccupant == e.target.value) {
      while (girlsRoomStatus.firstChild) {
        girlsRoomStatus.removeChild(girlsRoomStatus.firstChild);
      }
      girlsOccupant = '';
      girlsRoom.classList.remove('occupied');
    }
  }
}

function updateTime(elem, startTime) {
  setInterval(function() {
    (function(elem, startTime) {
      let time = Math.floor((Date.now() - startTime) / 60000);
      elem.innerHTML = (time === 1) ? time + 'min' : time + 'mins';
    })(elem, startTime)}, 60000);
}
