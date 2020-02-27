import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './FlexBox.module.scss'

const cn = classNames.bind(styles)

const FlexBox = ({ center, spaceBetween, children }) => {
  const FlexBoxClassName = cn('box', {
    'box--center': center,
    'box--space-between': spaceBetween,
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
