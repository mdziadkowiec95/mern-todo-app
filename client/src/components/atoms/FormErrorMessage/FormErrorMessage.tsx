import React from 'react';
import styles from './FormErrorMessage.module.scss';

type FormErrorMessageProps = {
  errors: any;
};

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ errors }) => (
  <div className={styles.error} id="feedback">
    {errors}
  </div>
);

export default FormErrorMessage;
