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

// Deletes items from task list matching id.
const deleteTaskById = function (taskList, id) {
  return taskList.filter((task) => task.id !== id);
};

// Changes list elements matching predicateFunc using mutatorFunc
const mapMutate = function (li, predicateFunc, mutatorFunc) {
  return li.map((element) => {
    if (predicateFunc(element)) {
      return mutatorFunc(element);
    } else {
      return element;
    }
  });
};

// toggle the isComplete field of an task object
// return a copy of the object with mutated
// field.
const toggleCompleteOnTask = (task) => {
  return { ...task, isComplete: !task.isComplete };
};

const App = () => {
  const [tasksData, setTasksData] = useState(TASKS);

  // Sets the complete status on a single task and modifies state.
  const setTasksHandler = (id) => {
    setTasksData((tasksData) =>
      mapMutate(tasksData, (task) => task.id === id, toggleCompleteOnTask)
    );
  };

  // deletes a task matching id and modifies state.
  const setDeleteHandler = (id) => {
    setTasksData((tasksData) => deleteTaskById(tasksData, id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={tasksData}
            setter={setTasksHandler}
            deleter={setDeleteHandler}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
