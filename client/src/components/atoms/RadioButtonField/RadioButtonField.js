import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './RadioButtonField.module.scss'

const RadioButtonField = ({ fieldTitle, name, data, selectedRadio, onChange, center }) => {
  const FieldSetWrapClassName = cn(styles.fieldset, {
    [styles.center]: center,
  })

  return (
    <fieldset className={FieldSetWrapClassName}>
      <p className={styles.fieldTitle}>{fieldTitle}</p>
      <span>
        {data.length > 0 &&
          data.map((item, i) => {
            const labelId = item.id ? item.id : item.value

            return (
              <div key={`radio-${i}`} className={styles.fieldWrap}>
                <input
                  type="radio"
                  name={name}
                  id={labelId}
                  value={item.value}
                  checked={selectedRadio === item.value}
                  onChange={e => onChange(e)}
                  className={styles.input}
                />
                <label htmlFor={labelId} className={styles.label}>
                  {item.label}
                </label>
              </div>
            )
          })}
      </span>
    </fieldset>
  )
}

RadioButtonField.propTypes = {
  data: PropTypes.array,
  fieldTitle: PropTypes.string,
  name: PropTypes.string,
  selectedRadio: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

RadioButtonField.defaultProps = {
  data: [],
}

export default RadioButtonField
