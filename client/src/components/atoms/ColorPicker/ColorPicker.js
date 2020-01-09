import React from 'react'
import styles from './ColorPicker.module.scss'
import PropTypes from 'prop-types'
import { defaultColors } from './defaultColors'

const ColorPicker = ({ colors, onSelectColor, selectedColor }) => {
  const colorPallete = Object.values(colors)

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
        {colorPallete.length > 0 ? (
          colorPallete.map(color => (
            <span
              role="presentation"
              key={color}
              data-color={color}
              className={styles.color}
              style={createSingleColorStyles(color, selectedColor)}
              onClick={() => onSelectColor(color)}
            ></span>
          ))
        ) : (
          <span>No colors available</span>
        )}
      </div>
    </div>
  )
}

ColorPicker.propTypes = {
  colors: PropTypes.object,
  onSelectColor: PropTypes.func.isRequired,
  selectedColor: PropTypes.string,
}

ColorPicker.defaultProps = {
  colors: defaultColors,
  selectedColor: '',
}
export default ColorPicker
