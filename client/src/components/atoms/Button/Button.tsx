import React from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
}

const Button: React.FC<ButtonProps> = ({ primary, secondary, children }) => {
  const buttonClassName = cn(styles.btn, {
    [styles.primary]: primary,
    [styles.secondary]: secondary
  });

  return <button className={buttonClassName}>{children}</button>;
};

export default Button;
