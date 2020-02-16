import React from 'react'
import FileListItem from '../../atoms/FileListItem/FileListItem'
import PropTypes from 'prop-types'

const FileList = ({ files, extendFilePath, onFileRemove }) => {
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
            onRemove={onFileRemove}
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
  onFileRemove: PropTypes.func.isRequired,
}

export default FileList
