import React from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

type ButtonProps = {
  isSubmit?: boolean;
  isBlock?: boolean;
  primary?: boolean;
  secondary?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  isSubmit = false,
  isBlock,
  primary,
  secondary,
  children
}) => {
  const ButtonClassName = cn(styles.btn, {
    [styles.primary]: primary,
    [styles.secondary]: secondary,
    [styles.block]: isBlock
  });

  return (
    <button type={isSubmit ? 'submit' : 'button'} className={ButtonClassName}>
      {children}
    </button>
  );
};

export default Button;
