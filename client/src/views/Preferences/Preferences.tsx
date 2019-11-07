import React from 'react';
import { NavLink } from 'react-router-dom';
import ContentTemplate from '../../templates/ContentTemplate/ContentTemplate';

const Preferences: React.FC = () => {
  return (
    <ContentTemplate>
      <NavLink to="/app">Close</NavLink>
      <h2>Preferences View</h2>
    </ContentTemplate>
  );
};

export default Preferences;
