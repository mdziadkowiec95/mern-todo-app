import React from 'react';
import styles from './MainTemplate.module.scss';
import Container from '../Container/Container';

const MainTemplate: React.FC = ({ children }) => {
  return (
    <div className={styles.main}>
      <Container>{children}</Container>
    </div>
  );
};

export default MainTemplate;
