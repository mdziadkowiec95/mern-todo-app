import React from 'react'
import styles from './LandingPage.module.scss'
import Heading from '../../components/atoms/Heading/Heading'
import Button from '../../components/atoms/Button/Button'
import Container from '../../templates/Container/Container'
import appLogo from '../../assets/app-logo-192.png'

const LandingPage = () => {
  return (
    <div className={styles.main}>
      <img src={appLogo} alt="Productive App - brand logo" className={styles.appLogo} />
      <Container>
        <div className={styles.hero}>
          <Heading primary tagSize={1}>
            Be <span style={{ color: '#3176ad' }}>Pro</span>ductive
          </Heading>
          <Button asRouterLink goTo="/sign-up" primary>
            Sign Up
          </Button>
          <Button asRouterLink goTo="/sign-in" secondary>
            Sign In
          </Button>
        </div>
      </Container>
    </div>
  )
}

export default LandingPage
