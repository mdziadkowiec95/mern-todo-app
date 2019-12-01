import React from 'react'
import PropTypes from 'prop-types'
import styles from './Chip.module.scss'
import config from '../../../config'
import cn from 'classnames'

const Chip = ({ id, background, children, canRemove, canAdd, onClick }) => {
  const inlineCSS = {
    backgroundColor: background,
  }

  const WrapperClassName = cn(styles.chip, {
    [styles.remove]: canRemove,
    [styles.add]: canAdd,
  })

  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      style={inlineCSS}
      className={WrapperClassName}
    >
      {children}
      {(canRemove || canAdd) && (
        <span className={styles.actionBtn}>
          <span className={styles.cross}></span>
        </span>
      )}
    </button>
  )
}

Chip.propTypes = {
  background: PropTypes.string,
  canRemove: PropTypes.bool,
  canAdd: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
}

Chip.defaultProps = {
  background: config.colors.primary,
  canRemove: false,
  canAdd: false,
}

export default Chip
