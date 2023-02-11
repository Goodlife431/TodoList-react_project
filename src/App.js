import React, {useState, useRef, useEffect} from "react";
import TodoList from "./TodoList";
import nextId from "react-id-generator";
function App() {
    const [Todos, setTodos] = useState([])
    const todoNameRef = useRef()
    const LOCAL_STORAGE_KEY = 'TodoApp.Todos'

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedTodos) setTodos(storedTodos)
    },[])

    useEffect(()=> {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Todos))
    },[Todos])

    function toggleTodo(id) {
        const newTodos = [...Todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)
    }

    function handleAddTodo() {
        const name = todoNameRef.current.value
        if (name === '') return
        setTodos(prevTodos => {
            return [...prevTodos, {id: nextId(), name: name, complete: false}]
        })
         todoNameRef.current.value = null
    }

    function handleClearTodo() {
        const newTodos = Todos.filter(todo => !todo.complete)
        setTodos(newTodos)
    }

    return (
   <>
     <TodoList todos = {Todos} toggleTodo={toggleTodo} />
     <input ref={todoNameRef} type={"text"}/>
     <button onClick={handleAddTodo}>
       Add Todo
     </button>
     <button onClick={handleClearTodo}>
       Clear Complete
     </button>
     <div>
         {Todos.filter(todo => !todo.complete).length} left to do
     </div>
   </>
  );
}

export default App;
