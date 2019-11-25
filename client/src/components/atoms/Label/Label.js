import React from 'react'
import PropTypes from 'prop-types'
import styles from './Label.module.scss'
import cn from 'classnames'

const Label = ({ center, className, children }) => {
  const LabelClassName = cn(
    styles.label,
    {
      [styles.center]: center,
    },
    className,
  )
  return <p className={LabelClassName}>{children}</p>
}

Label.propTypes = {
  center: PropTypes.bool,
  className: PropTypes.string,
}

Label.defaultProps = {
  center: false,
  className: '',
}

export default Label
