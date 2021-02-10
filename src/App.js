import { useState, useEffect } from 'react';

const LOCA_STORAGE_KEY = 'todolist.app';

function TodoList({ todoList, toggleTodoHandler }) {
  return (
      <div>
          {todoList.map(todo => <Todo key={todo.id} todo={todo} onCheckedChange={toggleTodoHandler} /> )}
      </div>
  )
}

function Todo({ todo, onCheckedChange }) {
  const onChangeCheck = () => onCheckedChange(todo.id);

  return (
      <div>
          <input type="checkbox" checked={todo.complete} onChange={onChangeCheck} ></input>
          {todo.title}
      </div>
  )
}

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  useEffect(() => {
    const storeTodos = JSON.parse(localStorage.getItem(LOCA_STORAGE_KEY));
    if (storeTodos) setTodos(storeTodos);
  }, []);

  
  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);

    todo.complete = !todo.complete;
    setTodos(newTodos);
  }
  
  useEffect(() => {
    localStorage.setItem(LOCA_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]);

  const handleClear = () => {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  } 
  
  const onClickHandler = () => {
    const title = inputValue;
    setTodos(prevTodos => { 
      return [...prevTodos, {id: `${title}-${new Date().getTime()}`, title: title, complete: false}];
    });

    setInputValue('');
  }

 
  return (
    <>
      <TodoList todoList={todos} toggleTodoHandler={toggleTodo} />
      <input onChange={handleInputChange} value={inputValue} type="text"></input>
      <button onClick={onClickHandler}>Añadir tarea</button>
      <button onClick={handleClear}>Limpiar tarea finalizadas</button>

      <div>
        { todos.filter(todo => !todo.complete).length} tareas por terminar
      </div>
    </>
  );
}

export default App;
