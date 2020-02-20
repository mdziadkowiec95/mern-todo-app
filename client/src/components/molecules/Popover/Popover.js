import React, { useState } from 'react'
import styles from './Popover.module.scss'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

const cn = classNames.bind(styles)

const generateTooltipPositionCSS = (top, right, bottom, left, centerType) => {
  const styles = {
    top: top,
    bottom: bottom,
    left: left,
    right: right,
  }

  if (centerType) {
    const isVertical = centerType === 'vertical'

    styles.transform = isVertical
      ? `translateY(${bottom ? 50 : -50}%)`
      : `translateX(${right ? 50 : -50}%)`
  }

  return styles
}

const getTooltipPositionCSS = (position, gap) => {
  const fullDimPlusSpace = `calc(100% + ${gap}px)`

  switch (position) {
    case 'top':
      return generateTooltipPositionCSS(null, null, fullDimPlusSpace, '50%', 'horizontal')
    case 'right':
      return generateTooltipPositionCSS('50%', null, null, fullDimPlusSpace, 'vertical')
    case 'bottom':
      return generateTooltipPositionCSS(fullDimPlusSpace, null, null, '50%', 'horizontal')
    case 'left':
      return generateTooltipPositionCSS('50%', fullDimPlusSpace, null, null, 'vertical')
    default:
      return generateTooltipPositionCSS(null, null, fullDimPlusSpace, '50%', 'horizontal')
  }
}

const Popover = ({ text, children, position, gap, delay }) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseOver = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const TooltipClassName = cn('popover__tooltip', {
    'popover__tooltip--delayed': delay,
  })

  if (!text) return null

  return (
    <div
      onMouseOver={handleMouseOver}
      onFocus={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className={cn('popover')}
    >
      {isHovered && (
        <span
          className={TooltipClassName}
          style={{ ...getTooltipPositionCSS(position, gap), animationDelay: `${delay}ms` }}
        >
          {text}
        </span>
      )}
      {children}
    </div>
  )
}

Popover.propTypes = {
  position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  text: PropTypes.string.isRequired,
  gap: PropTypes.number,
  delay: PropTypes.number,
  children: PropTypes.node,
}

Popover.defaultProps = {
  position: 'top',
  gap: 10,
  delay: 0,
}

export default Popover
