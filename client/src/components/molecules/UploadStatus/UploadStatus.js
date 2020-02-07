import React from 'react'
import styles from './UploadStatus.module.scss'
import ProgressBar from '../../atoms/ProgressBar/ProgressBar'
const UploadStatus = ({ uploadList }) => {
  return (
    <div className={styles.wrap}>
      {uploadList.map(item => (
        <div key={item.id} className={styles.fileItem}>
          <p className={styles.fileName}>{item.fileName}</p>
          <ProgressBar percent={item.percentCompleted} />
        </div>
      ))}
    </div>
  )
}

export default UploadStatus
