import React from 'react'
import { colors } from './colors'
import styles from './ColorPicker.module.scss'
import PropTypes from 'prop-types'

const ColorPicker = ({ onSelectColor, selectedColor }) => {
  const colorsPallete = Object.values(colors)

  const createSingleColorStyles = (color, pickedColor) =>
    color === pickedColor
      ? {
          backgroundColor: '#fff',
          boxShadow: `${color} 0px 0px 0px 3px inset`,
        }
      : {
          backgroundColor: color,
          boxShadow: `${color} 0px 0px 0px 14px inset`,
        }

  return (
    <div className={styles.wrapper}>
      <div className={styles.palleteWrap}>
        {colorsPallete.map(color => (
          <span
            role="presentation"
            key={color}
            data-color={color}
            className={styles.color}
            style={createSingleColorStyles(color, selectedColor)}
            onClick={() => onSelectColor(color)}
          ></span>
        ))}
      </div>
    </div>
  )
}

ColorPicker.propTypes = {
  onSelectColor: PropTypes.func.isRequired,
  selectedColor: PropTypes.string,
}

ColorPicker.defaultProps = {
  selectedColor: '',
}
export default ColorPicker
