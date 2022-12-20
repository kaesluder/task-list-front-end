import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';

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

const TASKS_HOST = 'http://localhost:5000/';
const TASKS_LIST_ENDPOINT = `${TASKS_HOST}tasks`;

const markCompleteEndpoint = (id) =>
  `${TASKS_LIST_ENDPOINT}/${id}/mark_complete`;
const markIncompleteEndpoint = (id) =>
  `${TASKS_LIST_ENDPOINT}/${id}/mark_incomplete`;
const deleteEndpoint = (id) => `${TASKS_LIST_ENDPOINT}/${id}`;

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

const cleanDataFromAPI = (task) => {
  return {
    id: task.id,
    description: task.description,
    isComplete: task.is_complete,
    title: task.title,
  };
};

const cleanDataToAPI = (task) => {
  return {
    description: task.description,
    title: task.title,
  };
};

const getTasksData = function () {
  return axios
    .get(TASKS_LIST_ENDPOINT)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => console.log(error));
};

const App = () => {
  const [tasksData, setTasksData] = useState(TASKS);

  useEffect(() => {
    return getTasksData().then((data) =>
      setTasksData(data.map(cleanDataFromAPI))
    );
  }, []);

  // Sets the complete status on a single task and modifies state.
  const setTasksHandler = (id) => {
    // get a handle for the changed task outside of the
    // map call.
    const localTask = tasksData.filter((t) => t.id === id)[0];

    if (localTask.isComplete) {
      axios.patch(markIncompleteEndpoint(localTask.id));
    } else {
      axios.patch(markCompleteEndpoint(localTask.id));
    }

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
