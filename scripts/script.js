const taskList = document.querySelector('.task-list')
const addOrUpdateButton = document.querySelector('.add-update')
const input = document.querySelector('input')
const alertMsg = document.querySelector('.alert-msg')
let addMode = true
let tasks = []

const generateId = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000)
    return `${timestamp}${randomNum}`
}

const getTasks = () => {

    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }

    tasks.forEach(e => {
        const taskContainer = document.createElement('div')
        const inputCheck = document.createElement('input')
        const taskValue = document.createElement('p')
        const btnContainer = document.createElement('div')
        const editBtn = document.createElement('i')
        const deleteBtn = document.createElement('i')

        taskContainer.classList.add('task-container')

        inputCheck.setAttribute('type', 'checkbox')
        inputCheck.setAttribute('value', 'done')
        inputCheck.classList.add('input-check')

        taskValue.textContent = e.task
        taskValue.classList.add('task-value')

        btnContainer.classList.add('btn-container')

        editBtn.classList.add('fa-solid', 'fa-pen')
        deleteBtn.classList.add('fa-solid', 'fa-trash-can')
        deleteBtn.setAttribute('data-id', e.id)
        
        btnContainer.appendChild(editBtn)
        btnContainer.appendChild(deleteBtn)
        taskContainer.appendChild(inputCheck)
        taskContainer.appendChild(taskValue)
        taskContainer.appendChild(btnContainer)
        taskList.appendChild(taskContainer)
    })
}

const alertMessage = (delStyle1, delStyle2, text, styles) => {
    alertMsg.classList.remove(delStyle1, delStyle2)
    alertMsg.textContent = text
    alertMsg.classList.add(styles)
}

const addTask = () => {
    const confirmContainer = document.querySelector('.confirm-container')
    const task = {
        id: generateId(),
        task: input.value,
        status: false
    }
    if(!input.value) {
        alertMessage('add-msg', 'question-msg', 'Write a task!', 'error-msg')
        confirmContainer.style.display = 'none'
    } else {
        tasks = [...tasks, task]
        input.value = ''
        alertMessage('error-msg', 'question-msg', 'Task added successfully!', 'add-msg')
        confirmContainer.style.display = 'none'
        getTasks()
    }
}

const handleAdd = e => {

}

const editTask = () => {

}

const deleteTask = task => {
    const taskName = task.children[1].innerText
    const confirmContainer = document.querySelector('.confirm-container')
    alertMessage('add-msg', 'error-msg', `Are you sure you want to delete the "${taskName}" task?`, 'question-msg')
    confirmContainer.style.display = 'flex'
    
    // Clonar el bóton de confirmación y reemplazarlo
    const confirmBtn = confirmContainer.querySelector('.fa-solid.fa-circle-check')
    const newConfirmBtn = confirmBtn.cloneNode(true) // Clonar el botón
    confirmBtn.replaceWith(newConfirmBtn) // Reemplazar el boton original con el clon

    // Confirmar eliminación
    newConfirmBtn.addEventListener('click', () => {
        tasks = tasks.filter(e => e.task !== taskName)
        task.remove()
        alertMessage('error-msg', 'question-msg', 'Task successfully deleted!', 'add-msg')
        confirmContainer.style.display = 'none'
    })

    // Cancelar eliminación
    confirmContainer.querySelector('.fa-solid.fa-circle-xmark').addEventListener('click', () => {
        alertMessage('error-msg', 'question-msg', 'The task was not deleted!', 'add-msg')
        confirmContainer.style.display = 'none'
    })
}

const getTask = searchedId => {
    const deleteBtns = document.querySelectorAll('.fa-solid.fa-trash-can')
    for(btn of deleteBtns) {
        const id = btn.getAttribute('data-id')
        if(id === searchedId) {
            return btn.parentElement.parentElement
        }
    }
    return null
}

addOrUpdateButton.addEventListener('click', () => {
    if(addMode) {
        addTask()
    } else {
        editTask()
    }
})

taskList.addEventListener('click', e => {
    if(e.target.classList.contains('fa-trash-can')) {
        const id = e.target.dataset.id
        const task = getTask(id)
        if(task) {
            deleteTask(task)
        }
    } 
})
