import React from 'react';
import styles from './Heading.module.scss';
import cn from 'classnames';

type THeadingProps = {
  tagSize?: number;
  primary?: boolean;
  secondary?: boolean;
};

const Heading: React.FC<THeadingProps> = ({ primary, secondary = true, tagSize = 2, children }) => {
  const headingClass = cn(styles.heading, {
    [styles.primary]: primary,
    [styles.secondary]: secondary,
  });

  const sizeInt = Math.floor(tagSize);
  const Tag = sizeInt >= 1 && sizeInt <= 6 ? `h${tagSize}` : 'h2';
  // @ts-ignore
  return <Tag className={headingClass}>{children}</Tag>;
};

export default Heading;
