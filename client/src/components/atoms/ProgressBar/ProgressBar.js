import React from 'react'
import styles from './ProgressBar.module.scss'

const ProgressBar = ({ percent }) => {
  const limitedPercent = percent <= 100 ? percent : 100

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.bar} style={{ width: `${limitedPercent}%` }}></div>
      </div>
      <span className={styles.percent}> {percent}%</span>
    </div>
  )
}

export default ProgressBar
