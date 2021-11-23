/**
 * global Variables
 */
let users = [];
let user = [];
let board = document.getElementById('canvanBoard');
let addTask = document.getElementById('popUpNewTask');
let memberAddTask = [];
let tasks = [];

/** init function important for Backend */
async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];    
}


(function getTheTasksFromServer() {
setTimeout(()=>{
        tasksAsString = backend.getItem('Tasks');
        tasks = JSON.parse(tasksAsString);
        console.log(tasks);
    },500);
})();



/**
 * addTask - onclick on plus icon remove the plus icon and display the possible Team-Members.
 */
document.getElementById('addTeamMember').addEventListener('click', (e) => {
    let members = document.getElementsByClassName('teamMember');
    for (let i = 0; i < members.length; i++) {
        members[i].classList.remove('displayNone');
    }
});

/**
 * onclick on the person mark the selcted Person and push the name to the memberAddTask Variable.
 */
let members = document.getElementsByClassName('teamMember');
for (let i = 0; i < members.length; i++) {
    let member = members[i];
    member.addEventListener('click', (e) => {
        let name = (e.target.parentNode.id);
        if (!memberAddTask.includes(name)) {
            memberAddTask.push(name);
        } else {
            let indexOfName = memberAddTask.indexOf(name);
            memberAddTask.splice(indexOfName, 1);
        }
        showSelectedUser(memberAddTask);
    });
}

function showSelectedUser(memberAddTask) {
    let plusIcon = document.getElementById('addTeamMember');
    for (let i = 0; i < members.length; i++) {
        let member = members[i];
        let memberImg = member.firstElementChild;
        if (memberAddTask.includes(member.id)) {
            memberImg.style.border = "green solid 5px";
            plusIcon.classList.remove('displayNone');
        } else {
            member.classList.add('displayNone');
            memberImg.style.border = "3px #203192 solid";
        }
    }
}

function saveTask() {
    let title = document.getElementById('title').value;
    let category = document.getElementById('category').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    let urgancy = document.getElementById('urgancy').value;
    let user = memberAddTask;
    let id = title.replace(/\s/g, "") + Math.round(Math.random() * 10);  // title + randomNumber without whitespaces
    let newTask = { _createdAt: new Date().getTime(), _list : 'todo', _title: title, _category: category, _description: description, _date: date, _urgancy: urgancy, _user: user, _id: id};
    
    if(tasks==null){
        tasks = [newTask];
        pushTaskJSONToServer(tasks);
        console.log( 'neuerTask erstellt: '+ tasks);
    } else {
        tasks.push({ _title: title, _category: category, _description: description, _date: date, _urgancy: urgancy, _user: user, _id: id}); // create the json
        pushTaskJSONToServer(tasks);
        console.log( ' alten Task erweitert: ' + tasks);
    }
}

function pushTaskJSONToServer(item) {
    backend.setItem('Tasks', JSON.stringify(item));
    let ourTasks = item;
    let tasksAsString = JSON.stringify(ourTasks);
    backend.setItem('Tasks', tasksAsString);
    setTimeout( () => {
        window.location.href = "/pages/backlog.html";
    }, 200);
}







