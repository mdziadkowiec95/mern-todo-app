import React from 'react'
import PropTypes from 'prop-types'
import styles from './TextField.module.scss'
import cn from 'classnames'

const TextField = ({
  isError,
  isSolid,
  isFlex,
  noMargin,
  onChangeFn,
  onBlurFn,
  inputValue,
  name,
  type,
  placeholder,
}) => {
  const TextFieldClassNames = cn(styles.wrapper, {
    [styles.solid]: isSolid,
    [styles.noMargin]: noMargin,
    [styles.isFlex]: isFlex,
  })

  const InputClassNames = cn(styles.input, {
    [styles.error]: isError,
    [styles.textArea]: type === 'textarea',
  })

  if (type === 'textarea')
    return (
      <div className={TextFieldClassNames}>
        <textarea
          type={type}
          name={name}
          value={inputValue}
          maxLength={100}
          className={InputClassNames}
          placeholder={placeholder}
          onChange={e => onChangeFn(e)}
          onBlur={e => onBlurFn(e)}
        />
      </div>
    )

  return (
    <div className={TextFieldClassNames}>
      <input
        type={type}
        name={name}
        value={inputValue}
        className={InputClassNames}
        placeholder={placeholder}
        onChange={e => onChangeFn(e)}
        onBlur={e => onBlurFn(e)}
      />
    </div>
  )
}

TextField.propTypes = {
  onChangeFn: PropTypes.func.isRequired,
  onBlurFn: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  isError: PropTypes.any,
  isSolid: PropTypes.bool,
  isFlex: PropTypes.bool,
  noMargin: PropTypes.bool,
  placeholder: PropTypes.string,
}

TextField.defaultProps = {
  type: 'text',
  placeholder: 'Enter some text...',
  isError: false,
  isSolid: false,
  isFlex: false,
  noMargin: false,
}
export default TextField
