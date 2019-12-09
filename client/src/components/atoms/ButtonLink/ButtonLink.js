import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './ButtonLink.module.scss'

const ButtonLink = ({ href, asNavLink, children }) => {
  const ButtonLinkClassName = cn(styles.btnLink)

  const ButtonLinkActiveClass = cn(styles.btnLink, styles.active)

  if (asNavLink)
    return (
      <NavLink to={href} className={ButtonLinkClassName} activeClassName={ButtonLinkActiveClass}>
        {children}
      </NavLink>
    )

  return (
    <Link to={href} className={ButtonLinkClassName}>
      {children}
    </Link>
  )
}

ButtonLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  href: PropTypes.string.isRequired,
  asNavLink: PropTypes.bool,
}

ButtonLink.defaultProps = {
  asNavLink: false,
  href: '',
}

export default ButtonLink
