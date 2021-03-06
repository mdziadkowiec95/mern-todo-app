import React, { useEffect } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cn from 'classnames'
import styles from './Sidebar.module.scss'
import AccordionMenu from '../../molecules/AccordionMenu/AccordionMenu'
import { toggleSidebar, toggleManageLabelsModal } from '../../../store/ui/actions'
import { compose } from 'redux'
import config from '../../../config'
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon'
import { getLabelsAndProjects } from '../../../store/preferences/async-actions'
import ManageLabelsModal from '../../molecules/ManageLabelsModal/ManageLabelsModal'
import Popover from '../../molecules/Popover/Popover'

const Sidebar = ({
  history,
  isSidebarOpen,
  isManageLabelsModalOpen,
  toggleManageLabelsModal,
  hideSidebar,
  getLabelsAndProjects,
  activePageType,
  userLabels,
  userProjects,
}) => {
  useEffect(() => {
    getLabelsAndProjects()
  }, [getLabelsAndProjects])

  // Fix closing sidebar (now it runs Redux action on every NavLink click)
  // It would be better to detect what was clicked (watch DropdownMenu)
  const handleSidebarClose = () => {
    if (isSidebarOpen) hideSidebar()
  }

  const SidebarWrapperClassName = cn(styles.wrapper, {
    [styles.isOpen]: isSidebarOpen,
  })
  return (
    <>
      <aside className={SidebarWrapperClassName}>
        <div className={styles.inner}>
          <NavLink
            to="/app/inbox"
            className={styles.tab}
            activeClassName={styles.isActive}
            onClick={handleSidebarClose}
          >
            Inbox
          </NavLink>
          <NavLink
            to="/app/today"
            className={styles.tab}
            activeClassName={styles.isActive}
            onClick={handleSidebarClose}
          >
            Today
          </NavLink>
          <NavLink
            to="/app/next-week"
            className={styles.tab}
            activeClassName={styles.isActive}
            onClick={handleSidebarClose}
          >
            Next week
          </NavLink>
          <br />
          <hr />
          <br />
          <div className={styles.accordion}>
            <AccordionMenu
              title="Labels"
              isActiveTab={activePageType === 'label'}
              routerLinkBase="/app/label/"
              items={userLabels}
              noItemsPlaceholder="You don't have any labels"
              onItemClick={handleSidebarClose}
              TabActionComponent={
                <Popover text="Edit labels" position="top" delay={1000}>
                  <ButtonIcon
                    name="edit"
                    size="tiny"
                    onClickFn={e => {
                      e.stopPropagation()
                      toggleManageLabelsModal(true)
                    }}
                  />
                </Popover>
              }
            />
          </div>

          <div className={styles.accordion}>
            <AccordionMenu
              title="Projects"
              isActiveTab={activePageType === 'project'}
              routerLinkBase="/app/project/"
              items={userProjects}
              noItemsPlaceholder="You don't have any projects"
              onItemClick={handleSidebarClose}
              TabActionComponent={
                <Popover text="Create project" position="top" delay={1000}>
                  <ButtonIcon
                    name="plus"
                    size="tiny"
                    onClickFn={e => {
                      e.stopPropagation()
                      history.push('/app/create-project')
                    }}
                  />
                </Popover>
              }
            />
          </div>
          {isManageLabelsModalOpen && <ManageLabelsModal />}
        </div>
      </aside>
      {isSidebarOpen && (
        <div role="presentation" onClick={hideSidebar} className={styles.overlay}></div>
      )}
    </>
  )
}

Sidebar.propTypes = {
  history: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  isManageLabelsModalOpen: PropTypes.bool.isRequired,
  hideSidebar: PropTypes.func.isRequired,
  toggleManageLabelsModal: PropTypes.func.isRequired,
  getLabelsAndProjects: PropTypes.func.isRequired,
  activePageType: PropTypes.oneOf(config.pageTypes),
  userLabels: PropTypes.array,
  userProjects: PropTypes.array,
}

Sidebar.defaultProps = {
  userLabels: [],
  userProjects: [],
}

const mapStateToProps = ({ ui, tasks: { pageContext }, preferences: { labels, projects } }) => ({
  isSidebarOpen: ui.isSidebarOpen,
  isManageLabelsModalOpen: ui.isManageLabelsModalOpen,
  userLabels: labels,
  userProjects: projects,
  activePageType: pageContext.type,
})

const mapDispatchToProps = dispatch => ({
  hideSidebar: () => dispatch(toggleSidebar(false)),
  toggleManageLabelsModal: isOpen => dispatch(toggleManageLabelsModal(isOpen)),
  getLabelsAndProjects: () => dispatch(getLabelsAndProjects()),
})

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Sidebar)
