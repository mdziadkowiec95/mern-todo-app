import React, { useState } from 'react';
import TextField from './TextField';
import { DecoratorFn } from '@storybook/react';

export default { title: 'atoms/Inputs' };

const ParentComponent: React.FC = () => {
  const [value, setInputValue] = useState('');

  return <div></div>;
};

export const textFieldControlledByParent: React.FC = () => <ParentComponent />;
