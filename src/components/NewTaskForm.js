import React, { useState } from 'react';
import PropTypes from 'prop-types';

const kDefaultFormData = {
  title: '',
  description: '',
};

const NewTaskForm = (props) => {
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');

  const [formData, setFormData] = useState(kDefaultFormData);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleTaskSubmit(formData);
    setFormData(kDefaultFormData);
  };

  const handleNewData = (event) => {
    const dataValue = event.target.value;
    const dataField = event.target.name;

    const newFormData = { ...formData, [dataField]: dataValue };
    setFormData(newFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Task Title</label>
        <input
          type="type"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleNewData}
        />
      </div>
      <div>
        <label htmlFor="description">Task Description</label>
        <input
          type="type"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleNewData}
        />
      </div>
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
