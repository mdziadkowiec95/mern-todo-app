import React from 'react'
import PropTypes from 'prop-types'
import config from '../../../config'
import IconSVG from '../IconSVG/IconSVG'
import styles from './ButtonIcon.module.scss'
import cn from 'classnames'
import { NAMES } from '../IconSVG/names'

const { colors } = config

const ButtonIcon = ({
  name,
  type,
  size,
  title,
  color,
  maskContent,
  solid,
  centerInWrap,
  onClickFn,
  className,
  children,
}) => {
  const iconsToMask = ['check']
  const ButtonIconClassNames = cn(
    styles.btnIcon,
    styles[size],
    {
      [styles.solid]: solid,
    },
    className,
  )

  const iconSizes = {
    tiny: '15px',
    small: '20px',
    normal: '24px',
    big: '34px',
  }
  const maskSize = {
    tiny: parseInt(iconSizes.tiny) - 5 + 'px',
    small: parseInt(iconSizes.small) - 6 + 'px',
    normal: parseInt(iconSizes.normal) - 7 + 'px',
    big: parseInt(iconSizes.big) - 10 + 'px',
  }
  const maskStyles = {
    width: maskSize[size],
    height: maskSize[size],
  }

  const ButtonIconBase = (
    <button type={type} className={ButtonIconClassNames} title={title} onClick={onClickFn}>
      {children}
      <IconSVG name={name} size={iconSizes[size]} fill={color} />
      {maskContent && iconsToMask.includes(name) && (
        <span style={maskStyles} className={styles.mask}></span>
      )}
    </button>
  )

  return centerInWrap ? (
    <div className={styles.btnWrapCenter}>{ButtonIconBase}</div>
  ) : (
    ButtonIconBase
  )
}

ButtonIcon.propTypes = {
  name: PropTypes.oneOf(NAMES).isRequired,
  type: PropTypes.string,
  size: PropTypes.oneOf(['tiny', 'small', 'normal', 'big']),
  title: PropTypes.string,
  color: PropTypes.string,
  maskContent: PropTypes.bool,
  solid: PropTypes.bool,
  onClickFn: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
}

ButtonIcon.defaultProps = {
  title: '',
  type: 'button',
  size: 'normal',
  color: colors.secondary,
  maskContent: false,
  solid: false,
  className: '',
  children: null,
}

export default ButtonIcon
