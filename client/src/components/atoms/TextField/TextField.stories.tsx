import React, { useState } from 'react';
import TextField from './TextField';
import { DecoratorFn } from '@storybook/react';

export default { title: 'atoms/Inputs' };

const ParentComponent: React.FC = () => {
  const [value, setInputValue] = useState('');

  return (
    <div>
      <TextField onChangeFn={setInputValue} inputValue={value} />
    </div>
  );
};

export const textFieldControlledByParent: React.FC = () => <ParentComponent />;
