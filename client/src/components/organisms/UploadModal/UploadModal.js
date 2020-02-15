import React, { useState } from 'react'
import UploadZone from '../../molecules/UploadZone/UploadZone'
import styles from './UploadModal.module.scss'
import Button from '../../atoms/Button/Button'
import PropTypes from 'prop-types'
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon'
import FileListItem from '../../atoms/FileListItem/FileListItem'

const acceptedFileTypes = ['image/jpeg', 'image/png', 'image/bmp', '.pdf']

const UploadModal = ({ onSubmit, onCancel }) => {
  const [chosenFiles, setChosenFiles] = useState([])

  const getExtendedFilesData = files => {
    const extendedFilesData = files.map(file => ({
      fileData: file,
      fileType: file.type === 'application/pdf' ? 'pdf' : 'image',
      thumbnail: file.type === 'application/pdf' ? null : URL.createObjectURL(file),
    }))

    return extendedFilesData
  }

  const handleAddFiles = files => {
    // Create thumbnail URL only for images
    const extendedFilesData = getExtendedFilesData(files)

    setChosenFiles(extendedFilesData)
  }

  const handleFileDelete = index => {
    setChosenFiles(chosenFiles.filter((_, i) => index !== i))
  }

  const handleUploadSubmit = e => {
    e.preventDefault()
    onSubmit(chosenFiles)
  }

  return (
    <div className={styles.modal}>
      <div className={styles.inner}>
        <form onSubmit={handleUploadSubmit} className={styles.form}>
          <ButtonIcon name="closeBg" className={styles.closeBtn} onClickFn={onCancel} />
          <div className={styles.uploadZone}>
            <UploadZone
              isDisabled={false}
              onFilesAdded={handleAddFiles}
              acceptedFileTypes={acceptedFileTypes}
            />
          </div>
          <ul className={styles.fileList}>
            {chosenFiles.length > 0 &&
              chosenFiles.map((file, index) => (
                <FileListItem
                  key={`upload-item-${index}`}
                  name={file.fileData.name}
                  path={file.thumbnail}
                  mimetype={file.fileData.type}
                  onRemove={() => handleFileDelete(index)}
                  readonly
                />
              ))}
          </ul>
          <Button isSubmit primary>
            Upload
          </Button>
        </form>
      </div>
    </div>
  )
}

UploadModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default UploadModal
