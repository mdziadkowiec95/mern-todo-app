import React from 'react';

export default { title: 'atoms/Inputs' };

const ParentComponent: React.FC = () => {
  return <div></div>;
};

export const textFieldControlledByParent: React.FC = () => <ParentComponent />;
