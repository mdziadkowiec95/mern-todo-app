import React, { useState, useRef } from 'react'
import IconSVG from '../../atoms/IconSVG/IconSVG'
import styles from './Accordion.module.scss'
import cn from 'classnames'
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon'

const Accordion = ({ title, isActiveTab, TabActionComponent, children }) => {
  const [isActive, setIsActive] = useState(false)
  const [contentHeight, setContentHeight] = useState('0px')

  const contentEl = useRef(null)

  const toggleAccordion = () => {
    const { scrollHeight } = contentEl.current

    setIsActive(!isActive)
    setContentHeight(!isActive ? `${scrollHeight}px` : '0px')
  }

  const wrapperClassName = cn(styles.accordion, {
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
        {TabActionComponent && TabActionComponent}
      </div>
      <div ref={contentEl} style={{ maxHeight: `${contentHeight}` }} className={styles.content}>
        <div className={styles.contentInner}>{children}</div>
      </div>
    </div>
  )
}

export default Accordion
