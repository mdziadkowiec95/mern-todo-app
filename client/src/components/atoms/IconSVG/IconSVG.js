import React from 'react'
import PropTypes from 'prop-types'
import { PATHS } from './paths'
import { NAMES } from './names'

const getViewBox = name => {
  switch (name) {
    // If you want to change viewBox for specific icon then
    // add new 'case' statement with icon name and return viewBox value
    default:
      return '0 0 24 24'
  }
}

const getPath = (name, props) => {
  const path = PATHS[name]

  if (path) {
    return <path {...props} d={path} />
  }
  return <path />
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
