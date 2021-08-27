const container = document.getElementById('report-container');

var useReport = {};

document.getElementById('generate-report-btn').addEventListener('click', generateReport);

function generateReport () {
  while (container.firstChild) {
    container.firstChild.remove();
  }
  useReport = JSON.parse(localStorage.dailyLog);

  for (let date in useReport) {
    let thisDate =  useReport[date];

    let dateEntry = document.createElement('div');
    dateEntry.classList.add('list-item');
    container.appendChild(dateEntry);
    
    let dateLabel = document.createElement('label');
      dateLabel.setAttribute('for', date.split('/').join(''));
      dateEntry.appendChild(dateLabel);

    let dateBtn = document.createElement('input');
      dateBtn.type = 'checkbox';
      dateBtn.id = date.split('/').join('');
      dateBtn.name = date.split('/').join('');
      dateBtn.classList.add('expandable');
      dateEntry.appendChild(dateBtn);

    let dateSpan = document.createElement('span');
      dateSpan.innerHTML = date;
      dateLabel.appendChild(dateSpan);

    let studentList = document.createElement('ul');
      dateEntry.appendChild(studentList);

    for (let student in thisDate) {
      let currStudent = thisDate[student];

      let studentEntry = document.createElement('li');
        studentEntry.classList.add('list-item');
        studentList.appendChild(studentEntry);


      let studentLabel = document.createElement('label');
        studentLabel.setAttribute('for', student.split(' ').join(''));
        studentEntry.appendChild(studentLabel);

      let studentBtn = document.createElement('input');
        studentBtn.type = 'checkbox';
        studentBtn.id = student.split(' ').join('');
        studentBtn.name = student.split(' ').join('');
        studentBtn.classList.add('expandable');
        studentEntry.appendChild(studentBtn);      

      let studentName = document.createElement('span');
        studentName.innerHTML = student;
      let tripCount = document.createElement('span');
        tripCount.innerHTML = 'Visits:  ' + currStudent.count;
        tripCount.classList.add('fr');
        studentLabel.appendChild(studentName);
        studentLabel.appendChild(tripCount);

      let list = document.createElement('ul');
        studentEntry.appendChild(list);

      for (let i = 0; i < currStudent.time.length; i++) {
        let timeLog = document.createElement('li');
        let timeOut = document.createElement('span');
        let duration = document.createElement('span');
        timeOut.innerHTML = 'Time out: ' + currStudent.time[i][0];
        duration.innerHTML = `Duration:   ${currStudent.time[i][1]}mins`;
        duration.classList.add('fr');
        timeLog.appendChild(timeOut);
        timeLog.appendChild(duration);
        timeLog.classList.add('list-item')
        list.appendChild(timeLog);
      }
      // student.count
    }
  }
}