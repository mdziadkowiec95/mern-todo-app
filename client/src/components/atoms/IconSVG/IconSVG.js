import React from 'react'
import PropTypes from 'prop-types'
import { PATHS } from './paths'
import { NAMES } from './names'

const getViewBox = name => {
  switch (name) {
    case 'plus':
      return '0 0 24 24'
    case 'plusBackground':
      return '0 0 24 24'
    case 'plusBorder':
      return '0 0 24 24'
    case 'gear':
      return '0 0 24 24'
    case 'search':
      return '0 0 24 24'
    case 'calendar':
      return '0 0 24 24'
    case 'check':
      return '0 0 24 24'
    case 'flag':
      return '0 0 24 24'
    case 'arrowDown':
      return '0 0 24 24'
    default:
      return '0 0 24 24'
  }
}

const getPath = (name, props) => {
  switch (name) {
    case 'plus':
      return <path {...props} d={PATHS.plus} />
    case 'plusBackground':
      return <path {...props} d={PATHS.plusBackground} />
    case 'plusBorder':
      return <path {...props} d={PATHS.plusBorder} />
    case 'minusBorder':
      return <path {...props} d={PATHS.minusBorder} />
    case 'serach':
      return <path {...props} d={PATHS.search} />
    case 'gear':
      return <path {...props} d={PATHS.gear} />
    case 'calendar':
      return <path {...props} d={PATHS.calendar} />
    case 'check':
      return <path {...props} d={PATHS.check} />
    case 'checkBackground':
      return <path {...props} d={PATHS.checkBackground} />
    case 'flag':
      return <path {...props} d={PATHS.flag} />
    case 'logout':
      return <path {...props} d={PATHS.logout} />
    case 'arrowDown':
      return <path {...props} d={PATHS.arrowDown} />
    case 'closeBorder':
      return <path {...props} d={PATHS.closeBorder} />
    default:
      return <path />
  }
}

const IconSVG = ({ name, style = {}, viewBox, fill, size, className }) => (
  <svg
    fill={fill}
    width={size}
    style={style}
    height={size}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox={viewBox || getViewBox(name)}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    {getPath(name)}
  </svg>
)

IconSVG.propTypes = {
  name: PropTypes.oneOf(NAMES).isRequired,
  size: (props, propName, componentName) => {
    if (!/^\d+$/.test(props[propName].replace('px', ''))) {
      return new Error(
        'Invalid prop `' +
          propName +
          '` supplied to' +
          ' `' +
          componentName +
          '`. Validation failed. Size should be in "px" unit',
      )
    }
  },
}

IconSVG.defaultProps = {
  fill: '#000',
  viewBox: '',
  size: '24px',
  className: '',
}

export default IconSVG
