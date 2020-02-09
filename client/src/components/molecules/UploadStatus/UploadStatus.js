import React, { useState } from 'react'
import styles from './UploadStatus.module.scss'
import ProgressBar from '../../atoms/ProgressBar/ProgressBar'
import IconSVG from '../../atoms/IconSVG/IconSVG'
import Chip from '../../atoms/Chip/Chip'
import cn from 'classnames'
import PropTypes from 'prop-types'

const UploadStatus = ({ uploadList, allFinished, uploadActive, onClear }) => {
  const [isOpen, setIsOpen] = useState(true)

  const WrapClassName = cn(styles.wrap, {
    [styles.isOpen]: isOpen,
  })
  const UploadIconClassName = cn(styles.btnIcon, styles.btnIconUpload, {
    [styles.btnIconUploadActive]: uploadActive,
    [styles.btnIconUploadFinished]: allFinished,
  })
  const ArrowIconClassName = cn(styles.btnIcon, styles.btnIconArrow)

  return (
    <div className={WrapClassName}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.btn}>
        <IconSVG name="arrowDown" className={ArrowIconClassName} />
        <IconSVG name="upload" className={UploadIconClassName} />
      </button>
      {isOpen && (
        <div className={styles.list}>
          <hr />
          <Chip canRemove readonly small onClick={onClear}>
            Clear finished
          </Chip>
          {uploadList.length > 0 &&
            uploadList.map(item => (
              <div key={item.id} className={styles.fileItem}>
                <p className={styles.fileName}>{item.fileName}</p>
                <ProgressBar percent={item.percentCompleted} />
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

UploadStatus.propTypes = {
  uploadList: PropTypes.array,
  allFinished: PropTypes.bool.isRequired,
  uploadActive: PropTypes.bool.isRequired,
}

UploadStatus.defaultProps = {
  uploadList: [],
}

export default UploadStatus
