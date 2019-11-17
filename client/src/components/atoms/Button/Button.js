import React from 'react'
import cn from 'classnames'
import styles from './Button.module.scss'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Button = ({
  isSubmit = false,
  isBlock,
  primary,
  secondary,
  asRouterLink,
  asLink,
  goTo,
  children,
}) => {
  const ButtonClassName = cn(styles.btn, {
    [styles.primary]: primary,
    [styles.secondary]: secondary,
    [styles.block]: isBlock,
  })

  if (asLink && goTo) {
    return (
      <a href={goTo} target="_blank" rel="noopener noreferrer" className={ButtonClassName}>
        {children}
      </a>
    )
  }

  if (asRouterLink && goTo) {
    return (
      <Link className={ButtonClassName} to={goTo}>
        {children}
      </Link>
    )
  }

  return (
    <button type={isSubmit ? 'submit' : 'button'} className={ButtonClassName}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  isSubmit: PropTypes.bool,
  isBlock: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  asRouterLink: PropTypes.bool,
  asLink: PropTypes.bool,
  goTo: PropTypes.string,
}

export default Button
