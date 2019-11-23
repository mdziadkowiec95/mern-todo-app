import React from 'react'
import PropTypes from 'prop-types'
import config from '../../../config'
import IconSVG from '../IconSVG/IconSVG'
import styles from './ButtonIcon.module.scss'
import cn from 'classnames'
import { NAMES } from '../IconSVG/names'

const { colors } = config

const ButtonIcon = ({ name, size, title, color, maskContent, reversed, onClickFn }) => {
  const iconsToMask = ['check']
  const ButtonIconClassNames = cn(styles.btnIcon, {
    [styles[size]]: size !== 'normal',
    [styles.reversed]: reversed,
  })

  const iconSizes = {
    small: '20px',
    normal: '24px',
    big: '34px',
  }
  const maskSize = {
    small: parseInt(iconSizes.small) - 6 + 'px',
    normal: parseInt(iconSizes.normal) - 7 + 'px',
    big: parseInt(iconSizes.big) - 10 + 'px',
  }
  const maskStyles = {
    width: maskSize[size],
    height: maskSize[size],
  }
  return (
    <button className={ButtonIconClassNames} title={title} onClick={onClickFn}>
      <IconSVG name={name} size={iconSizes[size]} fill={color} />
      {maskContent && iconsToMask.includes(name) && (
        <span style={maskStyles} className={styles.mask}></span>
      )}
    </button>
  )
}

ButtonIcon.propTypes = {
  name: PropTypes.oneOf(NAMES).isRequired,
  size: PropTypes.oneOf(['small', 'normal', 'big']),
  title: PropTypes.string,
  color: PropTypes.string,
  maskContent: PropTypes.bool,
  reversed: PropTypes.bool,
  onClickFn: PropTypes.func,
}

ButtonIcon.defaultProps = {
  title: '',
  size: 'normal',
  color: colors.primary,
  maskContent: false,
  reversed: false,
}

export default ButtonIcon
