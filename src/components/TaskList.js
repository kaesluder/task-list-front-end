import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import './TaskList.css';

const TaskList = (props) => {
  const taskListHTML = props.tasks.map((task) => {
    console.log(task);
    return (
      <Task
        key={task.id}
        id={task.id}
        title={task.title}
        isComplete={task.isComplete}
        setter={props.setter}
        onUnregister={props.onUnregister}
      />
    );
  });
  return <ul className="tasks__list no-bullet">{taskListHTML}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  setter: PropTypes.func.isRequired,
  onUnregister: PropTypes.func.isRequired,
};

export default TaskList;
