import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cn from 'classnames'
import styles from './Sidebar.module.scss'
import Accordion from '../../molecules/Accordion/Accordion'
import ButtonLink from '../../atoms/ButtonLink/ButtonLink'
import { getActiveTab } from '../../../helpers/getActiveTab'
import { toggleSidebar } from '../../../store/ui/actions'

const Sidebar = ({ isSidebarOpen, hideSidebar, match }) => {
  const [activeTab, setActiveTab] = useState('')

  useEffect(() => {
    const activeTab = getActiveTab(match.url)

    setActiveTab(activeTab ? activeTab : '')
  }, [match])

  const SidebarWrapperClassName = cn(styles.wrapper, {
    [styles.isOpen]: isSidebarOpen,
  })
  return (
    <>
      <aside className={SidebarWrapperClassName}>
        <NavLink
          to="/app/inbox"
          className={styles.tab}
          activeClassName={styles.isActive}
          onClick={hideSidebar}
        >
          Inbox
        </NavLink>
        <NavLink
          to="/app/today"
          className={styles.tab}
          activeClassName={styles.isActive}
          onClick={hideSidebar}
        >
          Today
        </NavLink>
        <NavLink
          to="/app/next-week"
          className={styles.tab}
          activeClassName={styles.isActive}
          onClick={hideSidebar}
        >
          Next week
        </NavLink>
        <br />
        <hr />
        <br />
        <div className={styles.accordion}>
          <Accordion title="Labels" isActiveTab={activeTab === 'label'}>
            <ul>
              <li>
                <ButtonLink href="/app/label/1" className={styles} asNavLink>
                  Label 1
                </ButtonLink>
              </li>
              <li>
                <ButtonLink href="/app/label/2" asNavLink>
                  Label 2
                </ButtonLink>
              </li>
              <li>
                <ButtonLink href="/app/label/3" asNavLink>
                  Label 3
                </ButtonLink>
              </li>
              <li>
                <ButtonLink href="/app/label/4" asNavLink>
                  Label 4
                </ButtonLink>
              </li>
            </ul>
          </Accordion>
        </div>
        <div className={styles.accordion}>
          <Accordion title="Projects" isActiveTab={activeTab === 'project'}>
            <ul>
              <li>
                <ButtonLink href="/app/project/1" asNavLink>
                  Project 1
                </ButtonLink>
              </li>
              <li>
                <ButtonLink href="/app/project/2" asNavLink>
                  Project 2
                </ButtonLink>
              </li>
              <li>
                <ButtonLink href="/app/project/3" asNavLink>
                  Project 3
                </ButtonLink>
              </li>
              <li>
                <ButtonLink href="/app/project/4" asNavLink>
                  Project 4
                </ButtonLink>
              </li>
            </ul>
          </Accordion>
        </div>
      </aside>
      {isSidebarOpen && (
        <div role="presentation" onClick={hideSidebar} className={styles.overlay}></div>
      )}
    </>
  )
}

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool,
  hideSidebar: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  isSidebarOpen: state.ui.isSidebarOpen,
})

const mapDispatchToProps = dispatch => ({
  hideSidebar: () => dispatch(toggleSidebar(false)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
