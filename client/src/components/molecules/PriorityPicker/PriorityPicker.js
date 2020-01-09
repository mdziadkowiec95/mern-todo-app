import React, { useState } from 'react'
import styles from './PriorityPicker.module.scss'
import PropTypes from 'prop-types'
import config from '../../../config'
import PriorityFlag from '../../atoms/PriorityFlag/PriorityFlag'

const PriorityPicker = ({ priorities, onSelect, selectedPriority, allowEdit }) => {
  const [isOpen, toggleIsOpen] = useState(false)

  const handlePriorityChange = updatedPriority => {
    onSelect(updatedPriority)
    toggleIsOpen(false)
  }

  return (
    <div role="presentation">
      <button onClick={() => toggleIsOpen(true)}>
        <PriorityFlag priority={selectedPriority} />
      </button>
      {isOpen && allowEdit && (
        <div className={styles.options}>
          {priorities.length > 0 &&
            priorities.map(pr => (
              <button key={`priority-option-${pr}`} onClick={() => handlePriorityChange(pr)}>
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
}

PriorityPicker.defaultProps = {
  priorities: config.taskPriorities,
  allowEdit: false,
}
export default PriorityPicker
