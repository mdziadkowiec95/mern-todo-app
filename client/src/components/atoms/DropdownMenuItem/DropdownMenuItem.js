import React from 'react'
import styles from './DropdownMenuItem.module.scss'
import IconSVG from '../IconSVG/IconSVG'
import config from '../../../config'
import PropTypes from 'prop-types'
import { NAMES } from '../IconSVG/names'

const DropdownMenuItem = ({ iconName, iconColor, onClickFn, children }) => (
  <li>
    <button onClick={onClickFn} className={styles.button}>
      <IconSVG className={styles.iconSVG} name={iconName} fill={iconColor} />
      <span>{children}</span>
    </button>
  </li>
)

DropdownMenuItem.propTypes = {
  iconName: PropTypes.oneOf(NAMES).isRequired,
  iconColor: PropTypes.string,
  onClickFn: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

DropdownMenuItem.defaultProps = {
  iconColor: config.colors.primary,
}

export default DropdownMenuItem
