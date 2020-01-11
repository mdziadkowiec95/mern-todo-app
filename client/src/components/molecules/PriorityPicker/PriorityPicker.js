import React, { useState, useEffect } from 'react'
import styles from './PriorityPicker.module.scss'
import PropTypes from 'prop-types'
import config from '../../../config'
import PriorityFlag from '../../atoms/PriorityFlag/PriorityFlag'
import cn from 'classnames'

const PriorityPicker = ({
  priorities,
  onSelect,
  selectedPriority,
  allowEdit,
  title,
  className,
}) => {
  const [isOpen, toggleIsOpen] = useState(false)

  const handlePriorityChange = updatedPriority => {
    onSelect(updatedPriority)
    toggleIsOpen(false)
  }

  useEffect(() => {
    if (!allowEdit) toggleIsOpen(false)
  }, [allowEdit])

  const WrapperClassName = cn(styles.wrapper, className)

  return (
    <div role="presentation" className={WrapperClassName}>
      <button type="button" onClick={() => toggleIsOpen(true)} title={title}>
        <PriorityFlag priority={selectedPriority} />
      </button>
      {isOpen && allowEdit && (
        <div className={styles.options}>
          {priorities.length > 0 &&
            priorities.map(pr => (
              <button
                key={`priority-option-${pr}`}
                type="button"
                onClick={() => handlePriorityChange(pr)}
              >
                <PriorityFlag priority={pr} notActive={pr !== selectedPriority} />
              </button>
            ))}
        </div>
      )}
    </div>
  )
}

PriorityPicker.propTypes = {
  priorities: PropTypes.array,
  onSelect: PropTypes.func.isRequired,
  allowEdit: PropTypes.bool,
  title: PropTypes.string,
  className: PropTypes.string,
}

PriorityPicker.defaultProps = {
  priorities: config.taskPriorities,
  allowEdit: true,
  title: 'Set a priority',
  className: '',
}
export default PriorityPicker
