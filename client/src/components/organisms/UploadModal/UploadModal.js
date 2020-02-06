import React, { useState } from 'react'
import UploadZone from '../../molecules/UploadZone/UploadZone'
import styles from './UploadModal.module.scss'
import Button from '../../atoms/Button/Button'
import IconSVG from '../../atoms/IconSVG/IconSVG'
import PropTypes from 'prop-types'

const UploadModal = ({ onSubmit, progress }) => {
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

  const getFileThumbnailStyles = thumbnail => ({
    backgroundImage: thumbnail ? `url(${thumbnail})` : 'pdf',
  })

  return (
    <div className={styles.modal}>
      <form onSubmit={handleUploadSubmit} className={styles.modalWrap}>
        <UploadZone isDisabled={false} onFilesAdded={handleAddFiles} />

        <div>Progress: {progress.percentCompleted}%</div>
        <ul>
          {chosenFiles.length > 0 &&
            chosenFiles.map((file, index) => (
              <li
                role="presentation"
                key={`upload-item-${index}`}
                onClick={() => handleFileDelete(index)}
              >
                <span>{file.fileData.name}</span>
                {file.thumbnail && file.fileType === 'image' ? (
                  <div
                    className={styles.fileThumbnail}
                    style={getFileThumbnailStyles(file.thumbnail)}
                  />
                ) : (
                  <IconSVG name="pdf" size="50" />
                )}
              </li>
            ))}
        </ul>
        <Button isSubmit primary>
          Upload
        </Button>
      </form>
    </div>
  )
}

UploadModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default UploadModal
