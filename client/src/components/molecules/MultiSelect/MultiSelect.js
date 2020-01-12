import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Chip from '../../atoms/Chip/Chip'
import styles from './MultiSelect.module.scss'
import cn from 'classnames'
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon'
import { LabelOrProjectType } from '../../../propTypes'

const MultiSelect = ({ labels, options, selectedOptions, onSelect, onRemove }) => {
  const [firstRender, setFirstRender] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [listHeight, setListHeight] = useState('0px')

  useEffect(() => {
    setFirstRender(false)
  }, [])

  useEffect(() => {
    if (isOpen && (selectedOptions.length === 0 || selectedOptions.length === options.length)) {
      toggleOptionList(false)
    } else if (!firstRender && selectedOptions.length > 0) {
      toggleOptionList(true)
    }
    // Temporarily disabled es-lint here (isOpen in deps causes interval render)
    // eslint-disable-next-line
  }, [selectedOptions, options, firstRender])

  const listWrapEl = useRef(null)

  const toggleOptionList = isOpenFlag => {
    const { scrollHeight } = listWrapEl.current

    setIsOpen(isOpenFlag)
    setListHeight(isOpenFlag ? `${scrollHeight}px` : '0px')
  }

  const WrapperClassName = cn(styles.wrapper, {
    [styles.isOpen]: isOpen,
  })

  return (
    <div className={WrapperClassName} role="presentation">
      <div className={styles.chosenItems}>
        {selectedOptions.length > 0 &&
          selectedOptions.map(option => (
            <Chip
              key={`chip-active-${option._id}`}
              id={option._id}
              canRemove
              background={option.color ? option.color : null}
              onClick={onRemove}
            >
              {option.name}
            </Chip>
          ))}
        {!isOpen && (
          <>
            {selectedOptions.length === 0 && <span>{labels.add} </span>}
            <ButtonIcon
              name="plusBorder"
              size="small"
              title="Add"
              onClickFn={() => toggleOptionList(true)}
            />
          </>
        )}
      </div>
      <div ref={listWrapEl} className={styles.listWrap} style={{ maxHeight: listHeight }}>
        <div className={styles.listWrapInner}>
          <ButtonIcon
            name="closeBorder"
            size="small"
            title="Close list"
            onClickFn={() => toggleOptionList(false)}
          />
          {selectedOptions.length < options.length && <p>{labels.textOpen}</p>}
          {options.length > 0 && selectedOptions.length === options.length && (
            <p>{labels.allItemsSelected}</p>
          )}
          {options.length === 0 && <p>{labels.noItemsAvailable}</p>}
          <ul>
            {options.length > 0 &&
              options.map(option => {
                const optionAlreadySelected = selectedOptions.find(s => s._id === option._id)

                if (!optionAlreadySelected) {
                  return (
                    <Chip
                      key={`chip-${option._id}`}
                      id={option._id}
                      canAdd
                      background={option.color ? option.color : null}
                      onClick={onSelect}
                    >
                      {option.name}
                    </Chip>
                  )
                } else {
                  return null
                }
              })}
          </ul>
        </div>
      </div>
    </div>
  )
}

MultiSelect.propTypes = {
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string,
    }),
  ),
  labels: PropTypes.shape({
    add: PropTypes.string,
    dontAdd: PropTypes.string,
    textOpen: PropTypes.string,
  }),
  selectedOptions: PropTypes.arrayOf(LabelOrProjectType),
}

MultiSelect.defaultProps = {
  startAsClosed: false,
  labels: {
    add: 'Add options',
    dontAdd: `Don't add options`,
    textOpen: 'Choose option from the list',
  },
  options: [],
}

export default MultiSelect
