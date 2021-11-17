let users = [];
let allTasks = [];
async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];    
}

/** 
 * load the JSON with all Tasks
 */
setTimeout(printAllTasksIntoBacklog, 500);
function printAllTasksIntoBacklog() {
    
    let allTasksAsString = backend.getItem('Tasks');
    allTasks = JSON.parse(allTasksAsString);
    console.log(allTasks);
 }

async function init() {
    await downloadFromServer();
}
/** 
 * load the JSON with all the Tasks
 */
setTimeout(getAllTasks, 500);
function getAllTasks() {    
    let allTasksasString =  backend.getItem('Tasks');
    allTasks = JSON.parse(allTasksasString);
    console.log(allTasks);
    printTasksOnSite();       
 }

 function printTasksOnSite() {
     let div = document.getElementById('tasksOuterDiv');
     if(! allTasks){
         div.innerHTML = '<div id="alertBox"> <p> keine Tasks vorhanden</p> </div>';
     }
     allTasks.forEach( (task) => {
         let id = task._id;
         div.innerHTML += `
            <div class="tasksAtBacklog" id="${id}">
                <div class="taskLog">
                    <div> ${task._user} </div>
                    <div> ${task._category} </div>
                    <div> ${task._description} </div>
                </div>   
            </div>           
         `
     });

}

 document.getElementById('delteTasks').addEventListener('click', delteAllTasks);  
 function delteAllTasks() {   
    backend.deleteItem('Tasks');
    getAllTasks();
    printTasksOnSite();
    
}
     



     
     
     
     
     
 



 
