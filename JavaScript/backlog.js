let allTasks = [];

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
    printTasksOnSite();
}

function printTasksOnSite() {
    let div = document.getElementById('tasksOuterDiv');
    if (!allTasks) {
        div.innerHTML = '<div id="alertBox"> <p> keine Tasks vorhanden</p> </div>';
    }
    allTasks.forEach((task) => {
        let id = task._id;
        div.innerHTML += `
            <div class="tasksAtBacklog" onclick="addBoardItentifier(this.id)" id="${id}">
                <div class="taskLog">
                    <div> ${task._user} </div>
                    <div> ${task._category} </div>
                    <div> ${task._description} </div>
                </div>   
            </div>  
         `
        if (task._board == "yes") {
            document.getElementById(task._id).style.backgroundColor = "#e5ffe3";
        }
    });



}

document.getElementById('delteTasks').addEventListener('click', delteAllTasks);
function delteAllTasks() {
    backend.deleteItem('Tasks');
    getAllTasks();
    printTasksOnSite();

}

/**
 * if user clicked on task -> push new property (board: 'yes') to Task  
 */
function addBoardItentifier(clickedTaskID) {
    allTasks.forEach((task) => {
        if (task._id == clickedTaskID) {
            let index = allTasks.indexOf(task);
            allTasks[index]["_board"] = "yes";
            pushTaskJSONToServer(index);

        }
    })
}

function pushTaskJSONToServer() {
    backend.setItem('Tasks', JSON.stringify(allTasks));
    setTimeout(() => {
        window.location.href = "/index.html";
    }, 200);
}

















