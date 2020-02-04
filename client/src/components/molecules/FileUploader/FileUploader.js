import React, { useState, useRef } from 'react'
import styles from './FileUploader.module.scss'
import IconSVG from '../../atoms/IconSVG/IconSVG'
import config from '../../../config'

const FileUploader = ({ isDisabled, onFilesAdded }) => {
  const [isHightlighted, setIsHightlighted] = useState(false)
  const fileInputRef = useRef(null)

  const openFileDialog = () => {
    if (isDisabled) return
    fileInputRef.current.click()
  }

  // Create thumbnail URL only for images
  const getExtendedFilesData = files => {
    const extendedFilesData = files.map(file => ({
      fileData: file,
      fileType: file.type === 'application/pdf' ? 'pdf' : 'image',
      thumbnail: file.type === 'application/pdf' ? null : URL.createObjectURL(file),
    }))

    return extendedFilesData
  }

  const handleAddFiles = e => {
    if (isDisabled) return

    const files = Array.from(e.target.files)

    const extendedFilesData = getExtendedFilesData(files)

    onFilesAdded(extendedFilesData)
  }

  return (
    <div
      role="presentation"
      className={styles.dropArea}
      // onDragOver={this.onDragOver}
      // onDragLeave={this.onDragLeave}
      // onDrop={this.onDrop}
      onClick={openFileDialog}
      style={{ cursor: isDisabled ? 'default' : 'pointer' }}
    >
      <input
        ref={fileInputRef}
        className={styles.input}
        type="file"
        multiple
        accept="image/*,.pdf"
        onChange={handleAddFiles}
      />
      <IconSVG name="upload" size="52" className={styles.icon} fill={config.colors.primary} />
      <span className={styles.uploadText}>Click or drop files to upload</span>
    </div>
  )
}

export default FileUploader
