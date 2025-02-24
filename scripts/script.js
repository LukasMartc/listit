const taskList = document.querySelector('.task-list')
const addOrUpdateButton = document.querySelector('.add-update')
const input = document.querySelector('input')
const alertMsg = document.querySelector('.alert-msg')
let addMode = true
let tasks = []

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
        
        btnContainer.appendChild(editBtn)
        btnContainer.appendChild(deleteBtn)
        taskContainer.appendChild(inputCheck)
        taskContainer.appendChild(taskValue)
        taskContainer.appendChild(btnContainer)
        taskList.appendChild(taskContainer)
    })
}

const alertMessage = (type, text, styles) => {
    alertMsg.classList.remove(type)
    alertMsg.textContent = text
    alertMsg.classList.add(styles)
}

const addTask = () => {
    const task = {
        task: input.value,
        status: false
    }
    if(!input.value) {
        alertMessage('add-msg', 'Write a task!', 'error-msg')
    } else {
        tasks = [...tasks, task]
        input.value = ''
        alertMessage('error-msg', 'Task added successfully!', 'add-msg')
        getTasks()
    }
}

const editTask = () => {

}

addOrUpdateButton.addEventListener('click', () => {
    if(addMode) {
        addTask()
    } else {
        editTask()
    }
})


