import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import TaskListTemplate from '../../../templates/TaskListTemplate/TaskListTemplate';

const TaskBoard: React.FC<RouteComponentProps> = ({ match }) => {
  useEffect(() => console.log(match.url), [match]);

  return (
    <div>
      <div>Test dynamic route. URL = {match.url}</div>;
      <TaskListTemplate>
        <li>Task item</li>
        <li>Task item</li>
        <li>Task item</li>
        <li>Task item</li>
        <li>Task item</li>
      </TaskListTemplate>
      <button>Add Task</button>
    </div>
  );
};

export default TaskBoard;
