import React from 'react';
import styles from './TextField.module.scss';
import cn from 'classnames';

type TextFieldProps = {
  onChangeFn: Function;
  onBlurFn: Function;
  inputValue: string;
  name: string;
  type?: string;
  isError: boolean | '' | undefined;
  isSolid?: boolean;
  isFlex?: boolean;
  noMargin?: boolean;
  placeholder?: string;
};

const TextField: React.FC<TextFieldProps> = ({
  isError = false,
  isSolid = false,
  isFlex = false,
  noMargin = false,
  onChangeFn,
  onBlurFn,
  inputValue,
  name,
  type = 'text',
  placeholder = 'Enter some text...',
}) => {
  const TextFieldClassNames = cn(styles.wrapper, {
    [styles.solid]: isSolid,
    [styles.noMargin]: noMargin,
    [styles.isFlex]: isFlex,
  });

  const InputClassNames = cn(styles.input, {
    [styles.error]: isError,
  });

  return (
    <div className={TextFieldClassNames}>
      <input
        type={type}
        name={name}
        value={inputValue}
        className={InputClassNames}
        placeholder={placeholder}
        onChange={e => onChangeFn(e)}
        onBlur={e => onBlurFn(e)}
      />
    </div>
  );
};

export default TextField;