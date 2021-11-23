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

    let todos = allTasksWithBoardYes.filter( t => t['list'] == 'todo' );

    let todoDiv = document.getElementById('todo');
    todoDiv.innerHTML = "";
    todos.forEach( todo =>{
      todoDiv.innerHTML += insertBoardHTML(todo);
    } );

     let inprogress = allTasksWithBoardYes.filter( t => t['list'] == 'inprogress' );

    let inProgressDiv = document.getElementById('inprogress');
    inProgressDiv.innerHTML = "";
    inprogress.forEach( inPorog =>{
      inProgressDiv.innerHTML += insertBoardHTML(inProg);
    } );




//     allTasksWithBoardYes.forEach((task) => {
//         todoDiv.innerHTML += insertBoardHTML(task);
//     });
}

function insertBoardHTML(task) {
    return `
        <div draggable="true" ondragstart="startDragging(${task.createdAt})"  class="boardTask">
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
//     ev.target.appendChild(document.getElementById(data));

    let task = allTasksWithBoardYes.find( t => t.createdAt === currentDrag );
    task.list = list;
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    printBoardTask();
  }
function startDragging( taskId ){
    currentDrag = taskId;
}//Board

// script
let newTask = { _createdAt: new Date().getTime(), _list : 'todo', _title: title, _category: category, _description: description, _date: date, _urgancy: urgancy, _user: user, _id: id};