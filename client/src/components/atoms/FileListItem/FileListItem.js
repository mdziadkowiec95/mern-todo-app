import React from 'react'
import styles from './FileListItem.module.scss'
import PropTypes from 'prop-types'
import IconSVG from '../IconSVG/IconSVG'
import config from '../../../config'
import cn from 'classnames'
import ButtonIcon from '../ButtonIcon/ButtonIcon'

const FileListItem = ({ id, mimetype, name, path, readonly, onRemove }) => {
  const isPdfFile = mimetype => mimetype === 'application/pdf'
  const normalizePath = path => path.replace(/\\/g, '/')

  const getImageThumbnailStyles = thumbnail => ({
    backgroundImage: thumbnail ? `url(${normalizePath(thumbnail)})` : 'white',
  })

  const ThumbImageClassName = cn(styles.fileImg, styles.thumbnail)
  const IconImageClassName = cn(styles.fileImg, styles.icon)

  return (
    <div className={styles.wrap}>
      {isPdfFile(mimetype) ? (
        <div className={IconImageClassName}>
          <IconSVG name="pdf" size="50px" fill={config.colors['error-text']} />
        </div>
      ) : (
        <div className={ThumbImageClassName} style={getImageThumbnailStyles(path)}></div>
      )}
      <span className={styles.name} title={name}>
        {name}
      </span>
      <ButtonIcon name="minusBg" color={config.colors['error-bg']} onClickFn={() => onRemove(id)} />
      {!readonly && (
        <a
          href={`${path}`}
          rel="noopener noreferrer"
          target="_blank"
          className={styles.previewLink}
        >
          <IconSVG name="magnifier" fill={config.colors.tertiary} />
        </a>
      )}
    </div>
  )
}

FileListItem.propTypes = {
  id: PropTypes.string.isRequired,
  mimetype: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  readonly: PropTypes.bool,
  onRemove: PropTypes.func.isRequired,
}

FileListItem.defaultProps = {
  readonly: false,
}

export default FileListItem
