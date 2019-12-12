import React from 'react'
import styles from './BurgerButton.module.scss'
import PropTypes from 'prop-types'

const BurgerButton = ({ onClick }) => (
  <button className={styles.burgerBtn} onClick={onClick} data-testid="burger-btn">
    <span className={styles.inner}>
      <span className={styles.line}></span>
    </span>
  </button>
)

BurgerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default BurgerButton
