import React from 'react'
import PropTypes from 'prop-types'
import styles from './Loader.module.scss'
import cn from 'classnames'

const Loader = ({ isSmall, isLarge, fullScreen, inWrapper, absoluteCenter }) => {
  const loaderClass = cn(styles.loader, {
    [styles.small]: isSmall,
    [styles.large]: isLarge,
    [styles.absoluteCenter]: absoluteCenter,
  })

  const loader = <div className={loaderClass}></div>
  const loaderInWrapper = <div className={styles.inWrapper}>{loader}</div>
  const loaderWithBackground = <div className={styles.fullScreen}>{loader}</div>

  if (fullScreen) return loaderWithBackground
  if (inWrapper) return loaderInWrapper

  return loader
}

Loader.propTypes = {
  isSmall: PropTypes.bool,
  isLarge: PropTypes.bool,
  fullScreen: PropTypes.bool,
  inWrapper: PropTypes.bool,
}

Loader.defaultProps = {
  fullScreen: false,
  isSmall: false,
  isLarge: false,
  inWrapper: false,
}

export default Loader
