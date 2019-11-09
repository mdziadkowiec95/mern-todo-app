import React from 'react';
import styles from './TextField.module.scss';
import cn from 'classnames';

type TextFieldProps = {
  isSolid?: boolean;
  isFlex?: boolean;
  noMargin?: boolean;
  onChangeFn: Function;
  inputValue: string;
  name: string;
  placeholder?: string;
};

const TextField: React.FC<TextFieldProps> = ({
  isSolid = false,
  isFlex = false,
  noMargin = false,
  onChangeFn,
  inputValue,
  name,
  placeholder = 'Enter some text...'
}) => {
  const TextFieldClassNames = cn(styles.wrapper, {
    [styles.solid]: isSolid,
    [styles.noMargin]: noMargin,
    [styles.isFlex]: isFlex
  });

  return (
    <div className={TextFieldClassNames}>
      <input
        type="text"
        name={name}
        value={inputValue}
        className={styles.input}
        placeholder={placeholder}
        onChange={e => onChangeFn(e)}
      />
    </div>
  );
};

export default TextField;
