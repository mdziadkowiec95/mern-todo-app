import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import TaskListTemplate from '../../../templates/TaskListTemplate/TaskListTemplate';
import TaskCard from '../../../components/molecules/TaskCard/TaskCard';

const TaskBoard: React.FC<RouteComponentProps> = ({ match }) => {
  useEffect(() => console.log(match.url), [match]);

  return (
    <div>
      <div>Test dynamic route. URL = {match.url}</div>;
      <TaskListTemplate>
        <TaskCard />
      </TaskListTemplate>
      <button>Add Task</button>
    </div>
  );
};

export default TaskBoard;
