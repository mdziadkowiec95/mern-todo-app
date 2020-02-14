import React from 'react'
import styles from './FIleList.module.scss'
import FileListItem from '../../atoms/FileListItem/FileListItem'
import PropTypes from 'prop-types'

const FileList = ({ files, extendFilePath }) => {
  return (
    <div>
      {files.length > 0 ? (
        files.map(file => (
          <FileListItem
            key={file._id}
            id={file._id}
            mimetype={file.mimetype}
            name={file.name}
            path={extendFilePath ? extendFilePath(file.path) : file.path}
          />
        ))
      ) : (
        <p>No files uploaded</p>
      )}
    </div>
  )
}

FileList.propTypes = {
  files: PropTypes.array,
  extendFilePath: PropTypes.func,
}

export default FileList
