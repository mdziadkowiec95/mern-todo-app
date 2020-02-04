import React, { useState } from 'react'
import FileUploader from '../../molecules/FileUploader/FileUploader'
import styles from './UploadModal.module.scss'
import Button from '../../atoms/Button/Button'
import IconSVG from '../../atoms/IconSVG/IconSVG'

const UploadModal = () => {
  const [chosenFiles, setChosenFiles] = useState([])

  const handleAddFiles = filesData => {
    setChosenFiles(filesData)
  }

  const handleFileDelete = index => {
    setChosenFiles(chosenFiles.filter((_, i) => index !== i))
  }

  const handleUploadSubmit = e => {
    e.preventDefault()
    console.log(chosenFiles)
  }

  const getFileThumbnailStyles = thumbnail => ({
    backgroundImage: thumbnail ? `url(${thumbnail})` : 'pdf',
  })

  return (
    <div className={styles.modal}>
      <form onSubmit={handleUploadSubmit} className={styles.modalWrap}>
        <FileUploader isDisabled={false} onFilesAdded={handleAddFiles} />

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

export default UploadModal
