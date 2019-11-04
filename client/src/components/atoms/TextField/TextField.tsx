import React from 'react';
import styles from './TextField.module.scss';

interface TextFieldProps {
  onChangeFn: Function;
  inputValue: string;
}

const TextField: React.FC<TextFieldProps> = ({ onChangeFn, inputValue }) => {
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        className={styles.input}
        onChange={e => onChangeFn(e.target.value)}
      />
    </div>
  );
};

export default TextField;
