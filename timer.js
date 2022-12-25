let start = document.getElementById('start');
let pause = document.getElementById('pause');
let cancel = document.getElementById('cancel');

let hour = document.getElementById('hour');
let min = document.getElementById('min');
let sec = document.getElementById('sec');
let timeHolder = document.getElementById('timer');

//store the variable

let timerStuff = null; 

function timer(){
    if(hour.value == 0 && min.value == 0 && sec.value == 0){
        setDefault();
    } else if (sec.value != 0){
        sec.value--;
    } else if(min.value != 0 && sec.value == 0){
        sec.value = 59;
        min.value--;
    } else if(hour.value != 0 && min.value == 0 && sec.value == 0){
        min.value = 59;
        sec.value = 59;
        hour.value--;
    }
}



function stop() {
    clearInterval(timerStuff);
}

start.addEventListener('click', function() {
    function newInterval() {
        timerStuff = setInterval(function(){
            timer();
        }, 1000);
        pause.style.display = 'initial';
    }
    newInterval();
    start.style.display = 'none';
    
    if(hour.value == 0) {
        hour.style.display = 'none';
    }

    
     noInput();
    


});

pause.addEventListener('click', function() {
    function pauseTimer(){
        clearInterval(timerStuff);
        start.style.display = 'initial';
        pause.style.display = 'none';
    }
    pauseTimer();
   
     
    
    
});

//cancels current timer 
cancel.addEventListener('click', function() {
    hour.value = 00; 
    min.value = 20;
    sec.value = 00;

    stop();
    start.style.display = 'initial';
    hour.style.display = 'initial';
    pause.style.display = 'none';
    enableInput();
});

function setDefault(){
    hour.value = 00; 
    min.value = 20;
    sec.value = 00;
}

function noInput() {
    hour.disabled = true;
    min.disabled = true;
    sec.disabled = true;
    document.getElementById('timer').style.cursor = "pointer";
}

function enableInput() {
    hour.disabled = false;
    min.disabled = false;
    sec.disabled = false;
}






// To do list code 

let doBtn = document.getElementById('toDoBtn');
let inputBox = document.getElementById('text-input');
let newInput = document.getElementById('newToDo');
let taskCounter = document.getElementById('taskCounter');
let taskNums = 0; 


let taskList = JSON.parse(localStorage.getItem('taskList')) || [];

if(localStorage.getItem('taskList')) {
    taskList.map((newTask) => {
        createATask(newTask);    
    })

}



doBtn.addEventListener('click', ()=> {
    
    
    let words = document.createElement('p');
    let taskDone = false; 
        
   

    words.innerText = inputBox.value;
    
    newInput.appendChild(words);
   

    inputBox.value = "";

    

    const newTask = {
        id: new Date().getTime(),
        name: words.innerText,
        isDone: false

    }

 
    words.setAttribute('class', 'canDelete');
    words.setAttribute('id', newTask.id);


    console.log(newTask);
    taskList.push(newTask);
    localStorage.setItem('taskList', JSON.stringify(taskList));
   

    words.addEventListener('click', ()=> {
        if(taskDone == false){
            words.style.textDecoration = 'line-through';
            taskDone = true;
            taskNums+=1;
            taskCounter.innerText = taskNums;
        }
        
    })

    words.addEventListener('dblclick', () => {
        if(taskDone == true && words.style.textDecoration == 'line-through'){
            words.style.textDecoration = 'underline';
            taskDone = false;
            taskNums-=1;
            taskCounter.innerText = taskNums;
            
        }
    })

    
   

    words.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if(e.target.classList.contains('canDelete')){
            const taskId = e.target.closest('p.canDelete').id;
            removeTask(taskId);
            }
        words.style.display = 'none';
    })
    
});



function createATask(newTask){
    let words = document.createElement('p');
    //add class to the new p 
    words.setAttribute('class', 'canDelete');
    words.setAttribute('id', newTask.id);

    let taskDone = false; 
   

    words.innerText = newTask.name;
    
    newInput.appendChild(words);
   

    inputBox.value = "";

    words.addEventListener('click', ()=> {
        if(taskDone == false){
            words.style.textDecoration = 'line-through';
            taskDone = true;
            taskNums+=1;
            taskCounter.innerText = taskNums;
        }
        
    })

    words.addEventListener('dblclick', () => {
        if(taskDone == true && words.style.textDecoration == 'line-through'){
            words.style.textDecoration = 'underline';
            taskDone = false;
            taskNums-=1;
            taskCounter.innerText = taskNums;
            
        }
    })


    words.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if(e.target.classList.contains('canDelete')){
        const taskId = e.target.closest('p.canDelete').id;
        removeTask(taskId);
        }
        
        words.style.display = 'none';

    })



}

function submitTask(ele) {
    if(event.key === 'Enter')
    {
        doBtn.click();
    }
}

function removeTask(taskId) {
    taskList = taskList.filter((newTask) => 
            newTask.id != parseInt(taskId)
        )
        localStorage.setItem('taskList', JSON.stringify(taskList));
}



//Dark mode do later


// const sun  = document.getElementById('sun'); 
// const body = document.querySelector('body');
// const taskHalf = document.getElementById('task_half');
// const paragraph= document.getElementById('author-credits');


// sun.addEventListener('click', ()=> {
//     if(body.style.background == "white"){
//         changeToDark();
//     } else{
//         body.style.background = 'white';
//     }   
     
// })


// function changeToDark () {
//     sun.src = "icons/crescent-moon_1f319.png";
//     body.style.background = "black";
//     body.style.transition = "2s";
//     taskHalf.style.background = "#5c5470"
//     taskHalf.style.transition = '2s';
//     paragraph.style.color = 'white';
// }

// function changeToLight() {

// }