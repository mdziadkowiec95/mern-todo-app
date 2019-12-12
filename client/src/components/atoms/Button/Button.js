import React from 'react'
import cn from 'classnames'
import styles from './Button.module.scss'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Button = ({
  isSubmit = false,
  block,
  blockMobile,
  primary,
  secondary,
  tertiary,
  disabled,
  accent,
  asRouterLink,
  asLink,
  goTo,
  title,
  onClickFn,
  children,
}) => {
  const ButtonClassName = cn(styles.btn, {
    [styles.primary]: primary,
    [styles.secondary]: secondary,
    [styles.tertiary]: tertiary,
    [styles.accent]: accent,
    [styles.block]: block,
    [styles.blockMobile]: blockMobile,
  })

  if (asLink && goTo) {
    return (
      <a href={goTo} rel="noopener noreferrer" className={ButtonClassName} title={title}>
        {children}
      </a>
    )
  }

  if (asRouterLink && goTo) {
    return (
      <Link className={ButtonClassName} to={goTo} title={title}>
        {children}
      </Link>
    )
  }

  if (isSubmit)
    return (
      <button type="submit" className={ButtonClassName} title={title} disabled={disabled}>
        {children}
      </button>
    )

  return (
    <button onClick={e => onClickFn(e)} type="button" className={ButtonClassName} title={title}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  isSubmit: PropTypes.bool,
  block: PropTypes.bool,
  blockMobile: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  accent: PropTypes.bool,
  disabled: PropTypes.bool,
  asRouterLink: PropTypes.bool,
  asLink: PropTypes.bool,
  goTo: PropTypes.string,
  title: PropTypes.string,
  onClickFn: PropTypes.func,
}

Button.defaultProps = {
  title: '',
  asLink: false,
  disabled: false,
}

export default Button
