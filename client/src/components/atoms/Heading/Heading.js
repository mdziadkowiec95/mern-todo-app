import React from 'react'
import PropTypes from 'prop-types'
import styles from './Heading.module.scss'
import cn from 'classnames'

const Heading = ({ primary, secondary, tertiary, tagSize, center, className, children }) => {
  const headingClass = cn(styles.heading, {
    [styles.primary]: primary,
    [styles.secondary]: secondary,
    [styles.tertiary]: tertiary,
    [styles.center]: center,
  }, className)

  const sizeInt = Math.floor(tagSize)
  const Tag = sizeInt >= 1 && sizeInt <= 6 ? `h${tagSize}` : 'h2'

  return <Tag className={headingClass}>{children}</Tag>
}

Heading.propTypes = {
  children: PropTypes.string.isRequired,
  tagSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  center: PropTypes.bool,
  className: PropTypes.string
}

Heading.defaultProps = {
  tagSize: 2,
  center: false,
  className: ''
}

export default Heading
