import React from 'react';
import styles from './Loader.module.scss';
import cn from 'classnames';
interface LoaderProps {
  isSmall?: boolean;
  isLarge?: boolean;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isSmall, isLarge, fullScreen = false }) => {
  const loaderClass = cn(styles.loader, {
    [styles.small]: isSmall,
    [styles.large]: isLarge,
  });

  const loader = <div className={loaderClass}></div>;
  const loaderWithBackground = <div className={styles.wrapper}>{loader}</div>;

  if (fullScreen) return loaderWithBackground;

  return loader;
};

export default Loader;
