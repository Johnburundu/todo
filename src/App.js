import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]); // Инициализируем массив задач
  const [input, setInput] = useState(''); // Состояние для управления текстовым полем ввода
  const [activeTab, setActiveTab] = useState('all'); // активный таб все задачи

  // Функция для добавления задачи
  const handleAddTask = () => {
    if (input.trim()) {
      const newTask = {
        id: Date.now(),
        text: input,
        isCompleted: false
      };
      setTasks([...tasks, newTask]);
      setInput(''); // Очищаем поле ввода
    }
  };

  function handleDeleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function handleToggleTask(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCompleteAll = () => {
    setTasks(tasks.map(task => ({ ...task, isCompleted: true })));
  };

  const handleDeleteAll = () => {
    setTasks([]); // Очищаем список задач
  };

  const handleUndoAll = () => {
    setTasks(tasks.map(task => ({ ...task, isCompleted: false })));
  };


  return (
    <div className='App'>
      <main className='App-content'>
        <div className="top-content">
          <h1>Список дел</h1>
          <div className='container'>
            <input
              className="input"
              type="text"
              placeholder="Введите задачу..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button className="button" onClick={handleAddTask}>Добавить задачу</button>
          </div>
          <div className="tabs">
            <button
              onClick={() => handleTabClick('all')}
              className={activeTab === 'all' ? 'active' : ''}
            >
              Все задачи
            </button>
            <button
              onClick={() => handleTabClick('active')}
              className={activeTab === 'active' ? 'active' : ''}
            >
              Активные
            </button>
            <button
              onClick={() => handleTabClick('completed')}
              className={activeTab === 'completed' ? 'active' : ''}
            >
              Выполненные
            </button>
          </div>
        </div>
        <div className="task-list">
          <ul>
            {tasks
              .filter(task => {
                if (activeTab === 'active') return !task.isCompleted;
                if (activeTab === 'completed') return task.isCompleted;
                return true;
              })
              .map(task => (
                <li key={task.id}>
                  <div>
                    <input type="checkbox" checked={task.isCompleted} onChange={() => handleToggleTask(task.id)} />
                    <span className={task.isCompleted ? 'completed' : ''}>
                      {task.text}
                    </span>
                  </div>
                  <div>
                    <button className="task-button" onClick={() => handleToggleTask(task.id)}>
                      {task.isCompleted ? 'Отменить' : 'Готово'}
                    </button>
                    <button className="task-button delete" onClick={() => handleDeleteTask(task.id)}>Удалить</button>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>

        <div className="task-controls">
          <button className="task-button" onClick={handleCompleteAll}>
            Выполнить все
          </button>
          <button className="task-button delete" onClick={handleDeleteAll}>
            Удалить все
          </button>
          <button className="task-button" onClick={handleUndoAll}>
            Отменить все
          </button>
        </div>

      </main>
      {/* 
      <p>
        Содержимое массива tasks: <br />
        {tasks.map((task, index) => (
          <React.Fragment key={index}>
            {JSON.stringify(task)}<br />
          </React.Fragment>
        ))}
      </p> */}
    </div>
  );
}

export default App;
