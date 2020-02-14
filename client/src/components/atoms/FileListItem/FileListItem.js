import React from 'react'
import styles from './FileListItem.module.scss'
import PropTypes from 'prop-types'
import IconSVG from '../IconSVG/IconSVG'
import config from '../../../config'
import cn from 'classnames'
import { replaceToServerPort, isDevelopmentMode } from '../../../utils/env'

const FileListItem = ({ id, mimetype, name, path }) => {
  const isPdfFile = mimetype => mimetype === 'application/pdf'
  const normalizePath = path => path.replace(/\\/g, '/')

  const ThumbImageClassName = cn(styles.fileImg, styles.thumbnail)
  const IconImageClassName = cn(styles.fileImg, styles.icon)

  console.log(isDevelopmentMode())
  return (
    <div className={styles.wrap}>
      {isPdfFile(mimetype) ? (
        <div className={IconImageClassName}>
          <IconSVG name="pdf" size="60px" fill={config.colors['error-text']} />
        </div>
      ) : (
        <div
          className={ThumbImageClassName}
          style={{ backgroundImage: `url('/${normalizePath(path)}')` }}
        ></div>
      )}
      <span className={styles.name}>{name}</span>
      <a href={`/${path}}`} rel="noopener noreferrer" target="_blank">
        Preview
      </a>
      {/* <span className={styles.type}>{mimetype}</span> */}
    </div>
  )
}

FileListItem.propTypes = {
  id: PropTypes.string.isRequired,
  mimetype: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
}

export default FileListItem
