//select dom element
const input = document.getElementById('todo-input')
const addbtn = document.getElementById('add-btn')
const list = document.getElementById('todo-list')


const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

// //add event listener to add button
// addbtn.addEventListener('click', addTodo)
    
function saveTodos(){
    //save current todos  array to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}

//create dom node for todo item
function createTodoNode(todo,index){
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        textspan.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
        saveTodos(); // to save in local storage
    });

    const textspan = document.createElement('span');
    textspan.textContent = todo.text;
    textspan.style.margin= '0 8px';

    if(todo.completed){
        textspan.style.textDecoration = 'line-through';
    }
        //add double click event to edit the todo item
        textspan.addEventListener('dblclick', () => {
            const newText = prompt('Edit todo:', todo.text);
            if(newText !== null){
                todo.text = newText.trim();
                textspan.textContent = todo.text;
                saveTodos(); 
            }
        })


    // delete todo button
    const deletebtn = document.createElement('button');
    deletebtn.textContent = 'Delete';
    deletebtn.addEventListener('click', () => {
        todos.splice(index,1);
        saveTodos();
        render();
    })

    li.appendChild(checkbox);
    li.appendChild(textspan);
    li.appendChild(deletebtn);
    return li;
}




//render the whole todo list
function render(){
    list.innerHTML = '';
    todos.forEach((todo,index) => {
        const node = createTodoNode(todo,index);
        list.appendChild(node);
    });

    //recreate each item
    // todos.forEach((todo,index) => { // change for global todos array because of foreach loop
    //     list.appendChild(node)
    // });
}


function addTodo(){
    const text = input.value.trim();
    if(text === ''){
        return
    }
    todos.push({text, completed: false});
    input.value = '';
    saveTodos();
    render();
}

addbtn.addEventListener('click', addTodo);
render();
