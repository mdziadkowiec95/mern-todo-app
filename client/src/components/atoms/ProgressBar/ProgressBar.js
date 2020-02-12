import React from 'react'
import styles from './ProgressBar.module.scss'
import cn from 'classnames'
import IconSVG from '../IconSVG/IconSVG'
import config from '../../../config'
import PropTypes from 'prop-types'

const ProgressBar = ({ percent, isError }) => {
  const limitedPercent = percent <= 100 ? percent : 100

  const BarClassName = cn(styles.bar, {
    [styles.isError]: isError,
  })

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={BarClassName} style={{ width: `${limitedPercent}%` }}></div>
      </div>
      <span className={styles.percent}>
        {isError ? (
          <IconSVG name="exclamationMark" size={22} fill={config.colors['error-text']} />
        ) : (
          `${percent}%`
        )}
      </span>
    </div>
  )
}

ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired,
  isError: PropTypes.bool,
}

ProgressBar.defaultProps = {
  isError: false,
}

export default ProgressBar
