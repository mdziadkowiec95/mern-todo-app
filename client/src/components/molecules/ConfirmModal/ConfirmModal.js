import React from 'react'
import PropTypes from 'prop-types'
import styles from './ConfirmModal.module.scss'
import Heading from '../../atoms/Heading/Heading'
import Button from '../../atoms/Button/Button'
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon'

const ConfirmModal = ({ questionText, descriptionText, onConfirm, onCancel }) => {
  return (
    <div>
          <div className={styles.overlay}></div>
          <div className={styles.wrapper}>
    
    <div className={styles.inner}>
      <ButtonIcon name="closeBg" className={styles.closeBtn} onClickFn={onCancel} />
      <Heading center tagSize="3" className={styles.heading}>
        {questionText}
      </Heading>
      {descriptionText && <p>{descriptionText}</p>}
      <div className={styles.actionButtons}>
        <Button secondary onClickFn={onCancel}>
          Cancel
        </Button>
        <Button primary onClickFn={onConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  </div>
    </div>
  
  )
}

ConfirmModal.propTypes = {
  questionText: PropTypes.string,
  descriptionText: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

ConfirmModal.defaultProps = {
  questionText: 'Are you sure?',
  descriptionText: '',
}

export default ConfirmModal
