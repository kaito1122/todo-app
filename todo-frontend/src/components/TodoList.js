import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

const API_URL = process.env.REACT_APP_API_URL;

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await axios.get(API_URL);
                setTodos(res.data);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };
        fetchTodos();
    }, []);

    const addTodo = async (title) => {
        try {
            const res = await axios.post(API_URL, { title });
            setTodos([...todos, res.data]);
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const toggleComplete = async (id) => {
        const todo = todos.find(todo => todo._id === id);
        try {
            const res = await axios.put(`${API_URL}/${id}`, { title: todo.title, completed: !todo.completed });
            setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
        } catch (error) {
            console.error('Error toggling complete:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <div>
            <AddTodo addTodo={addTodo} />
            {todos.map(todo => (
                <TodoItem key={todo._id} todo={todo} onToggleComplete={toggleComplete} onDelete={deleteTodo} />
            ))}
        </div>
    );
};

export default TodoList;
