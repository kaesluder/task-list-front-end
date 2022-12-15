import React, { useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [tasksData, setTasksData] = useState(TASKS);

  const setTasksHandler = (id) => {
    setTasksData((tasksData) => {
      tasksData.map((task) => {
        if (id === task.id) {
          return { ...task, isComplete: !task.isComplete };
        } else {
          return task;
        }
      });
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={tasksData} setter={setTasksHandler} />}</div>
      </main>
    </div>
  );
};

export default App;
