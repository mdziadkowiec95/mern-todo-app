import React from 'react'
import PropTypes from 'prop-types'
import styles from './Loader.module.scss'
import cn from 'classnames'

const Loader = ({ isSmall, isLarge, fullScreen }) => {
  const loaderClass = cn(styles.loader, {
    [styles.small]: isSmall,
    [styles.large]: isLarge,
  })

  const loader = <div className={loaderClass}></div>
  const loaderWithBackground = <div className={styles.wrapper}>{loader}</div>

  if (fullScreen) return loaderWithBackground

  return loader
}

Loader.propTypes = {
  isSmall: PropTypes.bool,
  isLarge: PropTypes.bool,
  fullScreen: PropTypes.bool,
}

Loader.defaultProps = {
  fullScreen: false,
  isSmall: false,
  isLarge: false,
}

export default Loader
