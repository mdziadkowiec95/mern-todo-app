import React from 'react'
import PropTypes from 'prop-types'
import styles from './Heading.module.scss'
import cn from 'classnames'

const Heading = ({ primary, secondary, tagSize, children }) => {
  const headingClass = cn(styles.heading, {
    [styles.primary]: primary,
    [styles.secondary]: secondary,
  })

  const sizeInt = Math.floor(tagSize)
  const Tag = sizeInt >= 1 && sizeInt <= 6 ? `h${tagSize}` : 'h2'

  return <Tag className={headingClass}>{children}</Tag>
}

Heading.propTypes = {
  children: PropTypes.string.isRequired,
  tagSize: PropTypes.number,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
}

Heading.defaultProps = {
  tagSize: 2,
  secondary: true,
}

export default Heading
