import React, { useState, useEffect, useRef } from 'react'
import styles from './ColorPicker.module.scss'
import PropTypes from 'prop-types'
import { defaultColors } from './defaultColors'
import classNames from 'classnames/bind'
import ColorDot from '../ColorDot/ColorDot'

const cn = classNames.bind(styles)

const ColorPicker = ({ colors, onSelectColor, selectedColor, direction }) => {
  const [isOpen, setIsOpen] = useState(false)

  const palleteEl = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleClickOutside = e => {
    if (palleteEl.current.contains(e.target)) return

    setIsOpen(false)
  }

  const colorPallete = Object.values(colors)

  const handleColorSelect = color => {
    onSelectColor(color)
    setIsOpen(false)
  }

  return (
    <div className={cn('picker')}>
      <button type="button" onClick={() => setIsOpen(true)}>
        <ColorDot color={selectedColor} />
      </button>

      {isOpen && (
        <div
          className={cn('picker__pallete', {
            'picker__pallete--rtl': direction === 'rtl',
          })}
          ref={palleteEl}
        >
          {colorPallete.length > 0 ? (
            colorPallete.map(color => (
              <ColorDot key={`color-${color}`} color={color} onClick={handleColorSelect} />
            ))
          ) : (
            <span>No colors available</span>
          )}
        </div>
      )}
    </div>
  )
}

ColorPicker.propTypes = {
  colors: PropTypes.object,
  onSelectColor: PropTypes.func.isRequired,
  selectedColor: PropTypes.string.isRequired,
}

ColorPicker.defaultProps = {
  colors: defaultColors,
  selectedColor: '#333',
}
export default ColorPicker
