import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './AccordionMenu.module.scss'
import ButtonLink from '../../atoms/ButtonLink/ButtonLink'
import Chip from '../../atoms/Chip/Chip'
import { NavLink } from 'react-router-dom'
import Button from '../../atoms/Button/Button'
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon'
import config from '../../../config'

const AccordionMenu = ({
  title,
  isActiveTab,
  items,
  onItemClick,
  routerLinkBase,
  noItemsPlaceholder,
  EditActionComponent,
  AddActionComponent,
}) => {
  const [isActive, setIsActive] = useState(false)
  const [isEditMode, toggleEditMode] = useState(false)
  const [contentHeight, setContentHeight] = useState('0px')

  const contentEl = useRef(null)

  const toggleAccordion = () => {
    const { scrollHeight } = contentEl.current

    setIsActive(!isActive)
    setContentHeight(!isActive ? `${scrollHeight}px` : '0px')
  }

  useEffect(() => {
    const { scrollHeight } = contentEl.current
    if (isActive) setContentHeight(`${scrollHeight}px`)
  }, [isActive, items])

  useEffect(() => {
    if (!isActive) toggleEditMode(false)
  }, [isActive])

  const handleEditState = () => {
    toggleEditMode(!isEditMode)
  }

  const handleItemDelete = (id) => {

  }

  const wrapperClassName = cn(styles.wrapper, {
    [styles.isActive]: isActive,
    [styles.activeTab]: isActiveTab,
  })

  const buttonClassName = cn(styles.btn, {
    [styles.activeTab]: isActiveTab,
  })

  return (
    <div className={wrapperClassName}>
      <div className={styles.btnWrap}>
        <button className={buttonClassName} onClick={toggleAccordion}>
          {title}
        </button>
        {isActive && EditActionComponent && EditActionComponent}
        {AddActionComponent && AddActionComponent}
      </div>
      <div ref={contentEl} style={{ maxHeight: `${contentHeight}` }} className={styles.content}>
        <div className={styles.contentInner}>
          {items.length > 0 ? (
            <ul>
              {items.map(item => (
                <li key={item._id}>
                  <NavLink to={`${routerLinkBase}${item._id}`} onClick={onItemClick}>
                    <Chip asTextLabel background={item.color} small>
                      {item.name}
                    </Chip>
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>{noItemsPlaceholder}</p>
          )}
        </div>
      </div>
    </div>
  )
}

AccordionMenu.propTypes = {
  title: PropTypes.string.isRequired,
  isActiveTab: PropTypes.bool,
  items: PropTypes.array,
  onItemClick: PropTypes.func,
  routerLinkBase: PropTypes.string.isRequired,
  noItemsPlaceholder: PropTypes.string,
  AddActionComponent: PropTypes.element,
  EditActionComponent: PropTypes.element,
  AddItemComponent: PropTypes.element,
}

AccordionMenu.defaultProps = {
  isActiveTab: false, 
  items: [],
  noItemsPlaceholder: `You don't have any items`,
}

export default AccordionMenu
