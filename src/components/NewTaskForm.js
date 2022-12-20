import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleTaskSubmit(title, description);
    setTitle('');
    setDescription('');
  };

  const handleNewTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleNewDescription = (event) => {
    setDescription(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Task Title</label>
      <input
        type="type"
        id="title"
        name="title"
        value={title}
        onChange={handleNewTitle}
      />
      <label htmlFor="description">Task Description</label>
      <input
        type="type"
        id="description"
        name="description"
        value={description}
        onChange={handleNewDescription}
      />
      <div>
        <input type="submit" value="Add Task"></input>
      </div>
    </form>
  );
};

NewTaskForm.propTypes = {
  handleTaskSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;
