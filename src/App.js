import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.js';

const BASE_URL = 'http://localhost:5000';

// convert tasks data from api so object key is IsComplete not is_complete
const convertFromApi = (apiTask) => {
  const { description, id, is_complete: isComplete, title } = apiTask;
  const newTask = { description, id, isComplete, title };
  return newTask;
};

// get list of all tasks from api
const getAllTasksApi = () => {
  return axios
    .get(`${BASE_URL}/tasks`)
    .then((response) => {
      return response.data.map(convertFromApi);
    })
    .catch((error) => {
      console.log(error);
    });
};

const markCompleteApi = (id, isComplete) => {
  const ifComplete = isComplete ? 'mark_complete' : 'mark_incomplete';

  return axios
    .patch(`${BASE_URL}/tasks/${id}/${ifComplete}`)
    .then((response) => {
      // console.log('marked complete or incomplete');
      return convertFromApi(response.data.task);
    })
    .catch((error) => {
      console.log(error);
    });
};

const removeTask = (id) => {
  return axios.delete(`${BASE_URL}/tasks/${id}`).catch((error) => {
    console.log(error);
  });
};

const addNewTaskApi = (newTaskData) => {
  return axios
    .post(`${BASE_URL}/tasks`, newTaskData)
    .then((response) => {
      // console.log(response.data);
      return convertFromApi(response.data.task);
    })
    .catch((error) => console.log(error));
};

const App = () => {
  const [tasksData, setTasksData] = useState([]);

  // call getAllTasksApi and set tasksData with setTasksData
  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = () => {
    return getAllTasksApi()
      .then((tasks) => {
        setTasksData(tasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setTasksHandler = (id, isComplete) => {
    // const task = tasksData.find((task) => task.id === id);

    return markCompleteApi(id, !isComplete)
      .then((newTask) => {
        setTasksData((tasksData) => {
          return tasksData.map((task) => {
            if (newTask.id === task.id) {
              return newTask;
            } else {
              return task;
            }
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const unregisterTask = (id) => {
    return removeTask(id)
      .then(() => {
        return getAllTasks();
      })
      .catch((error) => {
        console.log(error);
      });
    // setTasksData((tasksData) =>
    //   tasksData.filter((task) => {
    //     return task.id !== id;
    //   })
    // );
  };

  const handleTaskSubmit = (data) => {
    addNewTaskApi(data)
      .then((newTask) => {
        // console.log(tasksData);
        setTasksData([...tasksData, newTask]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <NewTaskForm handleTaskSubmit={handleTaskSubmit} />
          <TaskList
            tasks={tasksData}
            setter={setTasksHandler}
            onUnregister={unregisterTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
