# Task Board 

## Description
After utilizing web-based resources and instructional support, I learned how to use jQuery Syntax and link Bootstrap to my stylesheet. Bootstrap provided, for example, the date picker. With jQuery, I created "task cards" that can be dragged and dropped into three lanes. The colors of the cards are dynamic, based on the due date of the task. Tasks can be added and removed, and are saved when the page reloads. 

## Table of Contents 

- [Installation](#installation)
- [Usage](#usage)
- [How-To-Guide](#how-to-guide)
- [Credits](#credits)
- [License](#license)

## Installation

To clone the assignment, click the green button labeled, "code." Copy the URL for the repository, using HTTPS, SSH, or GitHub CLI. Open Git Bash. Change the working directory to the desired location for the cloned directory. Type "git clone" and paste the copied URL. Press "enter" to create your local clone.

## Usage

The user will see an "add task" button and three columns: "to do," "in progress," and "done." When the user click's "add task," a module opens with a form. The user can enter the date the task is due, the title of the task, and a description of the task. A task that is due today will show as yellow. A task that is past due will show as red. The task cards are draggable and can be moved from "to do" to "in progress" and finally, to "done." When the tasks are in the "done" column, the card turns white.

<img src= "./assets/images/home-page.png" alt="screenshot">
<img src= "./assets/images/draggable-tasks.png" alt="screenshot">


## How-To-Guide
<ul>    
    <li>GIVEN a task board to manage a project</li>
    <li>WHEN I open the task board</li>
    <li>THEN the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)</li>
    <li>WHEN I view the task board for the project</li>
    <li>THEN each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)</li>
    <li>WHEN I click on the button to define a new task</li>
    <li>THEN I can enter the title, description and deadline date for the new task into a modal dialog</li>
    <li>WHEN I click the save button for that task</li>
    <li>THEN the properties for that task are saved in localStorage</li>
    <li>WHEN I drag a task to a different progress column</li>
    <li>THEN the task's progress state is updated accordingly and will stay in the new column after refreshing</li>
    <li>WHEN I click the delete button for a task</li>
    <li>THEN the task is removed from the task board and will not be added back after refreshing</li>
    <li>WHEN I refresh the page
    <li>THEN the saved tasks persist</li>
</ul>

## Credits
<ul>
    <li>Tutoring session with Andru Sanchez</li>
    <li>Tutoring session with Jacob Carver</li>
    <li>Tutoring session with Sandra Smith</li>
    <li>Tutoring session with Wesley Clements</li>
    <li>Tutoring session with Erik Hoversten</li>
    <li>Office hours with Anthony Barragan</li>
    <li>Office hours with Erik Hirsch</li>
    
</ul>

## License
 
Please refer to the LICENSE in the repo.

# [link to completed project](https://hweltzien.github.io/TaskBoard/)