import React from 'react';
import styles from './LandingPage.module.scss';
import Heading from '../../../components/atoms/Heading/Heading';
import Button from '../../../components/atoms/Button/Button';
import Container from '../../../templates/Container/Container';

const LandingPage: React.FC = () => {
  return (
    <div className={styles.main}>
      <Container>
        <div className={styles.hero}>
          <Heading tagSize={1}>Be Productive</Heading>
          <Button asRouterLink goTo="/sign-up" primary>
            Sign Up
          </Button>
          <Button asRouterLink goTo="/sign-in" secondary>
            Sign In
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default LandingPage;
