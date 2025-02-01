const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

const updateButton = document.getElementById("update-button");

const deleteButton = document.getElementById("delete-button");

const taskCounter = document.getElementById("task-counter");

const clearButton = document.getElementById("clear-button");

function saveTask() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach((task) => {
        tasks.push({
            text: task.firstChild.textContent,
            completed: task.classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTask() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(({text, completed}) => {
        const newTask = document.createElement("li");
        const taskContent = document.createTextNode(text);
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("completed");
        if(completed){
            newTask.classList.add("completed");
            checkbox.checked = true;
        }
        newTask.append(taskContent, checkbox);
        taskList.append(newTask);
    });
    updateTaskCounter();
}

loadTask();

function updateTaskCounter() {
    const totalTask = taskList.children.length;
    if(totalTask === 0){
        taskCounter.textContent = "Total de tareas: 0";
    }else{
        taskCounter.textContent = `Total de tareas: ${totalTask}`;
    }
}

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e);

    const taskText = taskInput.value;

    if(taskText !== ""){
        const newTask = document.createElement("li");

        const taskContent = document.createTextNode(taskText);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("complete-task");

        newTask.append(taskContent, checkbox);

        //newTask.textContent = taskText;
        taskList.append(newTask);
        taskInput.value = "";
        updateTaskCounter();
        saveTask();
    }
});

taskList.addEventListener("change", (e) => {
    if(e.target.classList.contains("complete-task")){
        const taskItem = e.target.parentElement;

        if (e.target.checked) {
            // Si está marcado
            taskItem.classList.add("completed");
        } else {
            // Si está desmarcado
            taskItem.classList.remove("completed");
        }
    }
});


taskList.addEventListener("click", (e) => {
    if(e.target.tagName === "LI"){
        console.log(`Hiciste click en: ${e.target.textContent}`);

        if(e.target.classList.contains("selected")){
            e.target.classList.remove("selected");
        } else {
            const previouslySelected = document.querySelector(".selected");

            if(previouslySelected){
                previouslySelected.classList.remove("selected");
            }

            e.target.classList.add("selected");

        }
    }
});

updateButton.addEventListener("click", () => {
    const selectedTask = document.querySelector(".selected");

    if(selectedTask){
        const newContent = prompt("Escribe el nuevo contenido para la tarea.")

        if(newContent && newContent.trim() !== ""){
            selectedTask.textContent = newContent;
            alert("Tarea actualizada con exito.")
        }else{
            alert("El contenido no puede estar vacio.")
        }
    }else{
        alert("No hay tarea seleccionada para actualizar.");
    }
});

deleteButton.addEventListener("click", () => {
    const selectedTask = document.querySelector(".selected");

    if(selectedTask){
        selectedTask.remove();
        updateTaskCounter();
        saveTask();
    }else{
        alert("No hay tarea seleccionada para eliminar.")
    }
});

clearButton.addEventListener("click", () => {
    taskList.innerHTML = "";
    updateTaskCounter();
    saveTask();
})

async function fetchTasks() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
        const tasks = await response.json();

        tasks.forEach(({ title, completed }) => {
            const newTask = document.createElement("li");
            const taskContent = document.createTextNode(title);
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("complete-task");
            checkbox.checked = completed;

            if (completed) {
                newTask.classList.add("completed");
            }

            newTask.append(taskContent, checkbox);
            taskList.append(newTask);
        });

        updateTaskCounter();

    } catch (error) {
        console.error("Error obteniendo las tareas:", error);
    }
}

async function addTaskToServer(title) {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, completed: false })
        });

        const newTask = await response.json();
        console.log("Tarea creada en el servidor:", newTask);
        
        return newTask;
    } catch (error) {
        console.error("Error al agregar tarea:", error);
    }
}


fetchTasks();



/*
        document.querySelectorAll("#taskList li").forEach((task) => {
            console.log(task);
            task.classList.remove("selected");
        });

e.target.classList.add("selected");

preventDefault  // Previene que el formulario recargue la página

trim()          // Elimina cualquier espacio en blanco al inicio y al final del texto ingresado.

createElement("li") // Crea un nuevo <li>

textContent      // Le asigna el texto ingresado

appendChild      // Lo añade a la lista de tareas

let tareaNueva = `<li>${taskText}</li>`;
taskList.innerHTML += tareaNueva;

*/