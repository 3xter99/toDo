'use strict'

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = []

const render = function () {
    todoList.textContent = ''
    todoCompleted.textContent = ''
    todoData.forEach(function (item) {
        const li = document.createElement('li')
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div>';
        if (item.completed) {
            todoCompleted.append(li)
        } else {
            todoList.append(li)
        }

        const btnTodoCompleted = li.querySelector('.todo-complete')
        btnTodoCompleted.addEventListener('click', function () {
            item.completed = !item.completed;
            localStorage.setItem('todos', JSON.stringify(todoData));
            render()
        })
        const todoRemove = li.querySelector('.todo-remove');
        todoRemove.addEventListener('click', function () {
            let index = todoData.indexOf(item)
            todoData.splice(index,1);
            localStorage.setItem('todos', JSON.stringify(todoData));
            li.remove()
        })
    })

}

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
    if (headerInput.value.trim()) {
        const newTodo = {
            value: headerInput.value,
            completed: false
        };
        todoData.push(newTodo);
        render();
        headerInput.value = '';
        localStorage.setItem('todos', JSON.stringify(todoData));
    }
})
let showLocalStorage = function() {
    todoData = JSON.parse(localStorage.getItem('todos'))
    render()
}
showLocalStorage()
render();
