allTasks = [];
allTasksWithBoardYes = [];

let currentDrag = 0;

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

    let todos = allTasksWithBoardYes.filter(t => t['list'] == 'todo');

    let todoDiv = document.getElementById('todo');
    todoDiv.innerHTML = "";
    todos.forEach(todo => {
        todoDiv.innerHTML += insertBoardHTML(todo);
    });

    let inprogress = allTasksWithBoardYes.filter(t => t['list'] == 'inprogress');

    let inprogressDiv = document.getElementById('inprogress');
    inprogressDiv.innerHTML = "";
    inprogress.forEach(inprogress => {
        inprogressDiv.innerHTML += insertBoardHTML(inprogress);
    });
    let testing = allTasksWithBoardYes.filter(t => t['list'] == 'testing');

    let testingDiv = document.getElementById('testing');
    testingDiv.innerHTML = "";
    testing.forEach(testing => {
        testingDiv.innerHTML += insertBoardHTML(testing);
    });
    let done = allTasksWithBoardYes.filter(t => t['list'] == 'done');

    let doneDiv = document.getElementById('done');
    doneDiv.innerHTML = "";
    done.forEach(done => {
        doneDiv.innerHTML += insertBoardHTML(done);
    });




    //     allTasksWithBoardYes.forEach((task) => {
    //         todoDiv.innerHTML += insertBoardHTML(task);
    //     });
}

function insertBoardHTML(task) {
    return `
        <div draggable="true" ondragstart="startDragging(${task._createdAt})"  class="boardTask">
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
function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
}

async function drop(ev, list) {
    ev.preventDefault();
    //     var data = ev.dataTransfer.getData('text');
    // ev.target.appendChild(document.getElementById(data));

    let task = allTasksWithBoardYes.find(task => task._createdAt === currentDrag);
    task.list = list;
    //await backend.setItem('Tasks', JSON.stringify(item));
    saveTask();
    pushTaskJSONToServer();
    printBoardTask();
}
function startDragging(taskId) {
    currentDrag = taskId;
}