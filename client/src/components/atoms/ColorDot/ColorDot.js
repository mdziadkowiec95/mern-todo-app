import React from 'react'
import styles from './ColorDot.module.scss'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

const cn = classNames.bind(styles)

const ColorDot = ({ color, onClick }) => {
  const createSingleColorStyles = c => ({
    backgroundColor: c,
    boxShadow: `${c} 0px 0px 0px 14px inset`,
  })

  return (
    <span
      role="presentation"
      data-color={color}
      className={cn('color', {
        'color--active': onClick,
      })}
      style={createSingleColorStyles(color)}
      onClick={onClick ? () => onClick(color) : null}
    ></span>
  )
}

ColorDot.propTypes = {
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default ColorDot
