allTasks = [];
allTasksWithBoardYes = [];

async function init() {
    await downloadFromServer();
}
/** 
 * load the JSON with all the Tasks
 */
setTimeout(getAllTasks, 500);
function getAllTasks() {
    let allTasksasString = backend.getItem('Tasks');
    allTasks = JSON.parse(allTasksasString);
    console.log(allTasks);
    filterTasksForBoard();
}

function filterTasksForBoard() {
    allTasks.forEach((task) => {
        if (task._board == "yes") {
            allTasksWithBoardYes.push(task);
            printBoardTask();
        }
    })
}

function printBoardTask() {
    let todoDiv = document.getElementById('todo');
    todoDiv.innerHTML = "";

    allTasksWithBoardYes.forEach((task) => {
        todoDiv.innerHTML += insertBoardHTML(task);
    });
}

function insertBoardHTML(task) {
    return `
        <div draggable="true" ondragstart="startDragging()" class="boardTask">
            <div> ${task._title} </div>
            <div> ${task._description}</div>
            <div> ${task._category} </div>
            <div> ${task._date}</div>
            <div> ${task._user}</div>    
        </div>`
}

function allowDrop(ev) {
    ev.preventDefault();
  }