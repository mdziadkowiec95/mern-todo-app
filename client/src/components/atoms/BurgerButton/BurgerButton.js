import React from 'react'
import styles from './BurgerButton.module.scss'

const BurgerButton = ({ onClickFn }) => {
  return (
    <button className={styles.burgerBtn} onClick={onClickFn}>
      <span className={styles.inner}>
        <span className={styles.line}></span>
      </span>
    </button>
  )
}

export default BurgerButton
