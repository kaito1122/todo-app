import React from 'react';

const TodoItem = ({ todo, onToggleComplete, onDelete }) => {
    return (
        <div>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.title}
            </span>
            <button onClick={() => onToggleComplete(todo._id)}>✔</button>
            <button onClick={() => onDelete(todo._id)}>❌</button>
        </div>
    );
};

export default TodoItem;
