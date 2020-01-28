import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './FlexBox.module.scss'

const FlexBox = ({ center, children }) => {
  const FlexBoxClassName = cn(styles.box, {
    [styles.center]: center,
  })

  return <div className={FlexBoxClassName}>{children}</div>
}

FlexBox.propTypes = {
  center: PropTypes.bool,
}

FlexBox.defaultProps = {
  center: false,
}

export default FlexBox
