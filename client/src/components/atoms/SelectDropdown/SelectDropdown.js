import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './SelectDropdown.module.scss'
import IconSVG from '../IconSVG/IconSVG'
import config from '../../../config'

const SelectDropdown = ({
  id,
  name,
  selectedValue,
  defaultOption,
  options,
  className,
  onChange,
  onBlur,
}) => {
  const SelectWrapClassName = cn(styles.selectWrap, className)

  const optionStandard = (option, i) => (
    <option key={`${option.name}-${i}`} value={option.value}>
      {option.name}
    </option>
  )

  const optionWithId = option => (
    <option key={option._id} value={option._id}>
      {option.name}
    </option>
  )

  return (
    <div className={SelectWrapClassName}>
      <IconSVG name="arrowDown" size="15px" fill={config.colors.primary} className={styles.arrow} />
      <select
        id={id}
        name={name}
        value={selectedValue}
        onChange={onChange}
        onBlur={onBlur}
        className={styles.select}
      >
        {defaultOption && <option value="">{defaultOption}</option>}
        {options.length > 0 &&
          options.map((option, i) =>
            option._id ? optionWithId(option) : optionStandard(option, i),
          )}
      </select>
    </div>
  )
}

SelectDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  selectedValue: PropTypes.string.isRequired,
  defaultOption: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string.isRequired,
      value: PropTypes.string,
    }),
  ),
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
}

SelectDropdown.defaultProps = {
  defaultOption: '',
  className: '',
}
export default SelectDropdown
