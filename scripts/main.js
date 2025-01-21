const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

const deleteButton = document.getElementById("delete-button");

const updateButton = document.getElementById("update-button");

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
    }
})

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
})


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
})

deleteButton.addEventListener("click", () => {
    const selectedTask = document.querySelector(".selected");

    if(selectedTask){
        selectedTask.remove();
    }else{
        alert("No hay tarea seleccionada para eliminar.")
    }
})

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
})





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