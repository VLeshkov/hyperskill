let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

function saveToJSON() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

let lastTaskId = taskList.length;

/*taskList.push({
      'taskString': 'Learn Javascript',
      'isChecked': 'false',
      'isDeleted': 'false'
    },
    {
      'taskString': 'Learn JSON',
      'isChecked': 'true',
      'isDeleted': 'false'
    },);*/

for (let i = 0; i < taskList.length; i++) {
  if (taskList[i]['isDeleted'] === 'false') {
    let taskHTML = `<input type="checkbox" id="${i}">
                <span class="task">${taskList[i]['taskString']}</span>
                <button class="delete-btn">Delete</button>`;
    let newLi = document.createElement('li');
    newLi.innerHTML = taskHTML;

    if (taskList[i]['isChecked'] === 'true') {
      newLi.querySelector('input').checked = 1;
      newLi.querySelector('.task').classList.add('checked');
    }

    document.getElementById('task-list').append(newLi);
  }
}



let addTaskButton = document.getElementById('add-task-button');
let taskText = document.getElementById('input-task');

function deleteButtonsIndex() {
  let deleteButtons = document.querySelectorAll('.delete-btn');

  for (let delBtn of deleteButtons) {
    delBtn.addEventListener('click', function() {
      taskList[delBtn.parentElement.querySelector('input').id]['isDeleted'] = 'true';
      delBtn.parentElement.remove();
      saveToJSON();
    });
  }
}

function checkBoxIndex() {
  let checkboxes = document.querySelectorAll('[type="checkbox"]');

  for (let checkbox of checkboxes) {
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        checkbox.parentElement.querySelector('.task').classList.add('checked');
        taskList[checkbox.parentElement.querySelector('input').id]['isChecked'] = 'true';
      } else {
        checkbox.parentElement.querySelector('.task').classList.remove('checked');
        taskList[checkbox.parentElement.querySelector('input').id]['isChecked'] = 'false';
      }
      saveToJSON();
    });
  }
}

deleteButtonsIndex();
checkBoxIndex();

addTaskButton.addEventListener('click', function() {
  if (taskText.value) {
    let taskElements = document.getElementById('task-list');

    let newTask = document.createElement('li');
    newTask.innerHTML = `<input type="checkbox" id="${lastTaskId}">
                         <span class="task">${taskText.value}</span>
                         <button class="delete-btn">Delete</button>`;

    taskElements.append(newTask);

    taskList.push({
          'taskString': taskText.value,
          'isChecked': 'false',
          'isDeleted': 'false'
      });
    saveToJSON();

    taskText.value = '';
    deleteButtonsIndex(); // call the function for delete buttons to reindex them and
                          // add event listener
    checkBoxIndex();      // same for the checkbox
  }
});
