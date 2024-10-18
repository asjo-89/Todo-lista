const form = document.querySelector('#form');
const input = document.querySelector('#input');
let list = document.querySelector('#list');

let toDoArray = JSON.parse(localStorage.getItem('toDoArray')) || [];
// let liItem = toDoArray.length ? toDoArray[toDoArray.length - 1].id + 1 : 0;

// Load existing tasks
createList(toDoArray);


//User adds text in the input then submits by clicking the button.
form.addEventListener('submit', e => {
    e.preventDefault();
    form.classList.remove('error');

    if (validateForm(input)) {
        addToArray(input);
        createList(toDoArray);
        localStorage.setItem('toDoArray', JSON.stringify(toDoArray));
        input.value = '';
    }
})



//Validating input data.
const validateForm = (input) => {

    if(input.value === '') {

        const parent = input.parentElement;
        parent.classList.add('error');

        return false
    }

    return true
}

//Input data set to an index in array.
const addToArray = (input) => {
    const todo = {
        id: toDoArray.length > 0 ? toDoArray[toDoArray.length - 1].id + 1 : 0,
        title: input.value,
        completed: false
    }
    toDoArray.push(todo);

}

//<li> is created for every index in array and shown in the list
//Includes colors, line through and buttons.
function createList(array)  {

    list.innerHTML = '';

    array.forEach(todo => {

        const li = document.createElement('li');
        const textSpan = document.createElement('span');

        textSpan.textContent = todo.title;
        li.appendChild(textSpan);

        if(todo.completed) {
            textSpan.classList.add('strike', 'color-2');
        }

        const button = document.createElement('button');
        button.textContent = 'Delete';
        button.classList.add('button');
        
        button.addEventListener('click', () => {
            const index = array.findIndex(_todo => _todo.id === todo.id);
            array.splice(index, 1);
            localStorage.setItem('toDoArray', JSON.stringify(array));
            li.remove();
        })

        textSpan.addEventListener('click', () => {

            todo.completed = !todo.completed

            if(todo.completed)
                textSpan.classList.add('strike', 'color-2', todo.completed); 
            else
                textSpan.classList.remove('strike', 'color-2');
                
            localStorage.setItem('toDoArray', JSON.stringify(array));
            
        })
        
        li.appendChild(button);
        list.appendChild(li);

        li.classList.add('color-1');

    })

}






