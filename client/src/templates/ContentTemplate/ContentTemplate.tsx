import React from 'react';
import styles from './ContentTemplate.module.scss';

const ContentTemplate: React.FC = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default ContentTemplate;
