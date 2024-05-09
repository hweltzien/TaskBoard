// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker

var myModal = document.getElementById('exampleModal')
var titleId = document.getElementById('titleId')
var descriptionId = document.getElementById('descriptionId')
var datepickerId = document.getElementById('datepicker')
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

myModal.addEventListener('shown.bs.modal', function () {
  titleId.focus()
  descriptionId.focus()
  document.getElementById('saveChanges').addEventListener('click', saveChanges)
})



//generate a unique task id
function generateTaskId() {
  if (nextId === null) {
    nextId = 1;
  } else {
    nextId++;
  }
  localStorage.setItem("nextId", JSON.stringify(nextId))
  return nextId;
  
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  // task.id = generateTaskId();
  const taskCard = $('<div>')
    .addClass('card task-card draggable my-3')
    .attr('data-task-id', task.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.description);
  const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-task-id', task.id);
  cardDeleteBtn.on('click', handleDeleteTask);

  // Sets the card background color based on due date. Only apply the styles if the dueDate exists and the status is not done.


  if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');


    // If the task is due today, make the card yellow. If it is overdue, make it red.
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
    }
  }

  // Gather all the elements created above and append them to the correct elements.
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  // Return the card so it can be appended to the correct lane.
  return taskCard;


}


// Create a function to render the task list and make cards draggable
function renderTaskList() {
  const tasks = readTasksFromStorage();

  if (!tasks) {
    tasks = [];
  }

  // Empty existing task cards out of the lanes
  const todoList = $('#todo-cards');
  todoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();

  // Loop through tasks and create task cards for each status
  for (let task of tasks) {
    if (task.status === 'to-do') {
      todoList.append(createTaskCard(task));
    } else if (task.status === 'in-progress') {
      inProgressList.append(createTaskCard(task));
    } else if (task.status === 'done') {
      doneList.append(createTaskCard(task));
    }
  }

}
$('#todo-cards, #in-progress-cards, #done-cards').sortable({

  connectWith: ".todo-list",
  receive: function (event, card) {
    console.log(card)
    const newListId = event.target.id
    const taskId = card.item.data("task-id")
    for (let i = 0; i < taskList.length; i++) {
      const task = taskList[i]
      if (task.id === taskId) {

        if (newListId === "todo-cards") {
          task.status = "to-do"
        } else if (newListId === "in-progress-cards") {
          task.status = "in-progress"
        } else {
          task.status = "done"
        }
        card.item.removeClass('bg-warning bg-danger text-white');
        card.item.children("button").removeClass('border-light');
        if (task.dueDate && task.status !== 'done') {
          const now = dayjs();
          const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');


          // If the task is due today, make the card yellow. If it is overdue, make it red.
          if (now.isSame(taskDueDate, 'day')) {
            card.item.addClass('bg-warning text-white');
          } else if (now.isAfter(taskDueDate)) {
            card.item.addClass('bg-danger text-white');
            card.item.children("button").addClass('border-light');
          }
        }
        break
      }
    }

    localStorage.setItem("tasks", JSON.stringify(taskList));
  }

}).disableSelection()

// Create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  const taskName = $('#titleId').val().trim();
  const taskType = $('#task-form').val().trim();
  const taskDate = $('#datepicker').val().trim();
  const descriptionId = $('#descriptionId').val().trim();
  console.log(taskName)

  const newTask = {
    // Here we use a Web API called `crypto` to generate a random id for our task. This is a unique identifier that we can use to find the task in the array. `crypto` is a built-in module that we can use in the browser and Nodejs.    
    id: crypto.randomUUID(),
    name: taskName,
    type: taskType,
    dueDate: taskDate,
    description: descriptionId,
    status: 'to-do',
  };

  // Pull the tasks from localStorage and push the new task to the array
  //  const tasks = readTasksFromStorage();
  taskList.push(newTask);

  // Save the updated tasks array to localStorage
  //  saveTasksToStorage(taskList);
  localStorage.setItem("tasks", JSON.stringify(taskList));

  // Render task data back to the screen
  renderTaskList();

  // Clear the form inputs
  $('#titleId').val('');
  $('#task-form').val('');
  $('#datepicker').val('');
  $('#descriptionId').val('');
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  console.log(event.target)
  const taskId = $(this).attr('data-task-id');
  console.log(taskId)
  const tasks = readTasksFromStorage();
  tasks.forEach((task) => {
    if (task.id === taskId) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  // saveTasksToStorage(tasks);
  localStorage.setItem('tasks', JSON.stringify(tasks))
  renderTaskList();
}

function readTasksFromStorage() {
  
  // we need to GRAB the CURRENT taskList in local Storage
  const savedData = localStorage.getItem('tasks')
  // we need to PARSE (CONVERT) the data 
  const jsTasks = JSON.parse(savedData); // we have our data in a JS array
  console.log("Tasks starting: ", jsTasks)


  return jsTasks
}
// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  // Read projects from localStorage
  //  const tasks = readTasksFromStorage();

  // Get the task id from the event
  const taskId = ui.draggable[0].dataset.taskId;

  // Get the id of the lane that the card was dropped into
  const newStatus = event.target.id;

  for (let task of taskList) {
    // Find the task card by the `id` and update the task status.
    if (task.id === taskId) {
      task.status = newStatus;
    }
  }
  // Save the updated tasks array to localStorage (overwritting the previous one) and render the new task data to the screen.
  localStorage.setItem('tasks', JSON.stringify(taskList));

}





$('#datepicker').datepicker({
  changeMonth: true,
  changeYear: true,
});

$(document).ready(function () {


  // Add event listener to the form element, listen for a submit event, and call the `handleAddTask` function.
  $('#task-form').on('submit', handleAddTask);
  // Make lanes droppable
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });
  renderTaskList()
});
