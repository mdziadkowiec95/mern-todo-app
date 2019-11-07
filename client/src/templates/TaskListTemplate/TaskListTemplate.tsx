import React from 'react';

const TaskListTemplate: React.FC = ({ children }) => {
  return (
    <div>
      <h2>Task List component</h2>
      <ul>{children}</ul>
    </div>
  );
};

export default TaskListTemplate;
