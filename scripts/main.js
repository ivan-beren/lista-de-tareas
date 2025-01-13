const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

taskForm = addEventListener("submit", (e) => {
    e.preventDefault();

    const taskText = taskInput.value;

    if(taskText !== ""){
        const newTask = document.createElement("li");
        newTask.textContent = taskText;
        taskList.append(newTask);
        taskInput.value = "";
    }
})





/*

preventDefault  // Previene que el formulario recargue la página

trim()          // Elimina cualquier espacio en blanco al inicio y al final del texto ingresado.

createElement("li") // Crea un nuevo <li>

textContent      // Le asigna el texto ingresado

appendChild      // Lo añade a la lista de tareas

*/