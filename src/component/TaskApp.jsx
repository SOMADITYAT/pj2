import React, { useState } from 'react';

const TaskApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState('');

  const addTask = () => {
    if (taskTitle.trim() !== '') {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskTitle('');
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const startEditing = (taskId, title) => {
    setEditingTaskId(taskId);
    setEditedTaskTitle(title);
  };

  const saveEditedTask = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, title: editedTaskTitle };
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditedTaskTitle('');
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditedTaskTitle('');
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'uncompleted') {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className="container mt-5">
      <h1>Task Manager</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add Task"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={addTask}>
            Add
          </button>
        </div>
      </div>

      <div className="mb-3">
        <button className="btn btn-outline-secondary" onClick={() => setFilter('all')}>
          All Tasks
        </button>
        <button className="btn btn-outline-secondary" onClick={() => setFilter('completed')}>
          Completed
        </button>
        <button className="btn btn-outline-secondary" onClick={() => setFilter('uncompleted')}>
          Uncompleted
        </button>
      </div>

      <ul className="list-group">
        {filteredTasks.map((task) => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  className="form-control"
                  value={editedTaskTitle}
                  onChange={(e) => setEditedTaskTitle(e.target.value)}
                />
                <div>
                  <button className="btn btn-success mr-2" onClick={() => saveEditedTask(task.id)}>
                    Save
                  </button>
                  <button className="btn btn-secondary" onClick={cancelEditing}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                  />
                  <label className="form-check-label" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                    {task.title}
                  </label>
                </div>
                <div>
                  <button className="btn btn-primary mr-2" onClick={() => startEditing(task.id, task.title)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskApp;
