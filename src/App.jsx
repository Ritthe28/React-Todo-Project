import React, { useState } from 'react'
import Nav from './Component/Nav.jsx'
import {v4 as uuidv4} from 'uuid'

const App = () => {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [editing, setEditing] = useState(null)

  const handleAdd = () => {
    if (editing !== null) {
      const updatedTodos = todos.map(item => 
        item.id === editing ? { ...item, todo } : item
      );
      setTodos(updatedTodos);
      setEditing(null);
    } else {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    }
    setTodo("");
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheck = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
  }

  const handleEdit = (id) => {
    const itemToEdit = todos.find(item => item.id === id);
    setTodo(itemToEdit.todo);
    setEditing(id);
  }

  const handleDelete = (id) => {
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
  }

  return (
    <>
      <Nav />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-50 min-h-[80vh]">
        <div className="addtodo">
          <h2 className="text-lg font-bold">Add a Todo </h2>
          <input onChange={handleChange} value={todo} type="text" className='w-8/12' />
          <button onClick={handleAdd} className='bg-violet-400 rounded-md mx-6 hover:bg-violet-800 p-3 p py-1 text-white'>Add</button>
        </div>
        <h2 className='text-lg font-bold'> Your Todos </h2>
        <div className="todos">
          {todos.map(item => (
            <div key={item.id} className="todo flex w-1/2 my-3 justify-between">
              <input name={item.id} onChange={handleCheck} type="checkbox" checked={item.isCompleted} />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              <div className="buttons">
                <button onClick={() => handleEdit(item.id)} className='bg-violet-400 rounded-md mx-6 hover:bg-violet-800 p-3 p py-1 text-white mx-2'>Edit</button>
                <button onClick={() => handleDelete(item.id)} className='bg-violet-400 rounded-md mx-6 hover:bg-violet-800 p-3 p py-1 text-white mx-2'>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
 