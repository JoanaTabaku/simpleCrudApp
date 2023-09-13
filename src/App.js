import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from 'react-icons/ai';

import './App.css';
import Todo from './Todo';
import { db } from './firebase.js';

import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Create Todo
  const createTodo = async (e) => {
    e.preventDefault();
    if (input === '') {
      alert('Please enter a valid todo');
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    });
    setInput('');
  };

  // Read Todo from firebase
  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // Update Todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete Todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <div className="app-container"> 
      <h2 className="app-title">Todo App</h2> 
      <form className="todo-form" onSubmit={createTodo}> 
        <input
          className="todo-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type='text'
          placeholder='Add Todo'
        />
        <button className="add-button" type="submit"> 
          <AiOutlinePlus /> 
        </button>
      </form>
      <ul className="todo-list"> 
        {todos.map((todo, index) => (
          <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
        ))}
      </ul>
      {todos.length < 1 ? null : <p className="todo-count">{`You have in total ${todos.length} todos`}</p>} {/* Add class name */}
    </div>
  );
}

export default App;
