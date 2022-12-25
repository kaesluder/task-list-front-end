import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = (props) => {
  // const [complete, setComplete] = useState(props.isComplete);
  const buttonClass = props.isComplete ? 'tasks__item__toggle--completed' : '';

  const handleTaskClicked = () => {
    props.setter(props.id, props.isComplete);
  };

  const handleUnregister = () => {
    props.onUnregister(props.id);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={handleTaskClicked}
      >
        {props.title}
      </button>
      <button className="tasks__item__remove button" onClick={handleUnregister}>
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  setter: PropTypes.func.isRequired,
  onUnregister: PropTypes.func.isRequired,
};

export default Task;
