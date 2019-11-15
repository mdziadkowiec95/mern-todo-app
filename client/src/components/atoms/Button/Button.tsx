import React from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

type ButtonProps = {
  isSubmit?: boolean;
  isBlock?: boolean;
  primary?: boolean;
  secondary?: boolean;
  asRouterLink?: boolean;
  asLink?: boolean;
  goTo?: string;
};

const Button: React.FC<ButtonProps> = ({
  isSubmit = false,
  isBlock,
  primary,
  secondary,
  asRouterLink,
  asLink,
  goTo,
  children,
}) => {
  const ButtonClassName = cn(styles.btn, {
    [styles.primary]: primary,
    [styles.secondary]: secondary,
    [styles.block]: isBlock,
  });

  if (asLink && goTo) {
    return (
      <a href={goTo} target="_blank" className={ButtonClassName}>
        {children}
      </a>
    );
  }

  if (asRouterLink && goTo) {
    return (
      <Link className={ButtonClassName} to={goTo}>
        {children}
      </Link>
    );
  }

  return (
    <button type={isSubmit ? 'submit' : 'button'} className={ButtonClassName}>
      {children}
    </button>
  );
};

export default Button;
