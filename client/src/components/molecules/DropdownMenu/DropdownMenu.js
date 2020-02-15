import React, { useState, useEffect, useCallback } from 'react'
import styles from './DropdownMenu.module.scss'
import cn from 'classnames'
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon'
import PropTypes from 'prop-types'
import { NAMES } from '../../atoms/IconSVG/names'
import config from '../../../config'

const DropdownMenu = ({ iconName, iconColor, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleDropdownClose = useCallback(() => {
    setIsOpen(false)
    document.removeEventListener('click', handleDropdownClose)
  }, [setIsOpen])

  // useEffect event listener cleanup
  useEffect(() => {
    return () => document.removeEventListener('click', handleDropdownClose)
  }, [handleDropdownClose])

  const handleDropdownOpen = () => {
    if (!isOpen) {
      setIsOpen(true)
      document.addEventListener('click', handleDropdownClose)
    }
  }

  const DropdownWrapClassName = cn(styles.dropdownMenu, {
    [styles.isOpen]: isOpen,
  })
  return (
    <div className={DropdownWrapClassName}>
      <ButtonIcon name={iconName} color={iconColor} onClickFn={() => handleDropdownOpen()} />
      <div className={styles.contentWrap}>
        <div className={styles.content}>
          <ul>
            {React.Children.map(children, child => {
              return child
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

DropdownMenu.propTypes = {
  iconName: PropTypes.oneOf(NAMES).isRequired,
  iconColor: PropTypes.string,
  children: PropTypes.node.isRequired,
}

DropdownMenu.defaultProps = {
  iconColor: config.colors.white,
}

export default DropdownMenu
