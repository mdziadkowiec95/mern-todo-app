import React from 'react'
import PropTypes from 'prop-types'
import styles from './Chip.module.scss'
import config from '../../../config'
import cn from 'classnames'

const Chip = ({ id, background, children, canRemove, canAdd, small, readonly, onClick }) => {
  const inlineCSS = {
    backgroundColor: background,
  }

  const WrapperClassName = cn(styles.chip, {
    [styles.remove]: canRemove,
    [styles.add]: canAdd,
    [styles.small]: small,
    [styles.readonly]: readonly,
  })

  return (
    <button
      type="button"
      onClick={onClick ? () => onClick(id) : null}
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
  small: PropTypes.bool,
  readonly: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
}

Chip.defaultProps = {
  background: config.colors.primary,
  canRemove: false,
  canAdd: false,
  small: false,
  readonly: false,
}

export default Chip
