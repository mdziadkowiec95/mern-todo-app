import React from 'react'
import PropTypes from 'prop-types'
import styles from './Heading.module.scss'
import classNames from 'classnames/bind'

const cn = classNames.bind(styles)

const Heading = ({ primary, secondary, tertiary, tagSize, center, className, children }) => {
  const HeadingClassName = cn(
    'heading',
    {
      'heading--primary': primary,
      'heading--secondary': secondary,
      'heading--tertiary': tertiary,
      'heading--center': center,
    },
    className,
  )

  const sizeInt = Math.floor(tagSize)
  const Tag = sizeInt >= 1 && sizeInt <= 6 ? `h${tagSize}` : 'h2'

  return <Tag className={HeadingClassName}>{children}</Tag>
}

Heading.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  tagSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  center: PropTypes.bool,
  className: PropTypes.string,
}

Heading.defaultProps = {
  tagSize: 2,
  center: false,
  className: '',
}

export default Heading
