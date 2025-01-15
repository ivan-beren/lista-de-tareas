const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskText = taskInput.value;

    if(taskText !== ""){
        const newTask = document.createElement("li");
        newTask.textContent = taskText;
        taskList.append(newTask);
        taskInput.value = "";
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

*/