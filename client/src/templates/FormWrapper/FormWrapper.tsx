import React from 'react';
import styles from './FormWrapper.module.scss';

const FormWrapper: React.FC = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default FormWrapper;
