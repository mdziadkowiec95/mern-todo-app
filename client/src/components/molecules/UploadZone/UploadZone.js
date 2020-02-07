import React, { useState, useRef } from 'react'
import styles from './UploadZone.module.scss'
import IconSVG from '../../atoms/IconSVG/IconSVG'
import config from '../../../config'
import cn from 'classnames'
import PropTypes from 'prop-types'

const UploadZone = ({ isDisabled, onFilesAdded, acceptedFileTypes }) => {
  const [isHightlighted, setIsHightlighted] = useState(false)
  const fileInputRef = useRef(null)

  const openFileDialog = () => {
    if (isDisabled) return
    fileInputRef.current.click()
  }

  const handleAddFiles = e => {
    if (isDisabled) return

    const files = Array.from(e.target.files)
    onFilesAdded(files)
  }

  const onDragOver = e => {
    e.preventDefault()
    if (isDisabled) return
    setIsHightlighted(true)
  }

  const onDragLeave = e => {
    e.preventDefault()
    setIsHightlighted(false)
  }

  const onDrop = e => {
    e.preventDefault()
    if (isDisabled) return

    const files = Array.from(e.dataTransfer.files)

    onFilesAdded(files)
    setIsHightlighted(false)
  }

  const DropAreaClassName = cn(styles.dropArea, {
    [styles.hightlighted]: isHightlighted,
  })

  return (
    <div
      role="presentation"
      className={DropAreaClassName}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={openFileDialog}
      style={{ cursor: isDisabled ? 'default' : 'pointer' }}
    >
      <input
        ref={fileInputRef}
        className={styles.input}
        type="file"
        multiple
        accept={acceptedFileTypes}
        onChange={handleAddFiles}
      />
      <IconSVG name="upload" size="52" className={styles.icon} fill={config.colors.primary} />
      <span className={styles.uploadText}>Click or drop files to upload</span>
    </div>
  )
}

UploadZone.propTypes = {
  isDisabled: PropTypes.bool,
  onFilesAdded: PropTypes.func.isRequired,
}

UploadZone.defaultProps = {
  isDisabled: false,
  acceptedFileTypes: '*',
}

export default UploadZone
