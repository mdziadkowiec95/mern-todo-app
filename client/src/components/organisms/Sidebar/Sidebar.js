import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cn from 'classnames'
import styles from './Sidebar.module.scss'
import AccordionMenu from '../../molecules/AccordionMenu/AccordionMenu'
import { toggleSidebar, toggleAddLabelModal } from '../../../store/ui/actions'
import { compose } from 'redux'
import withPageContext from '../../../hoc/withPageContext'
import config from '../../../config'
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon'
import AddLabelModal from '../../molecules/AddLabelModal/AddLabelModal'

const Sidebar = ({
  isSidebarOpen,
  isAddLabelModalOpen,
  toggleAddLabelModal,
  hideSidebar,
  pageContext,
  labels,
}) => {
  const [activeTab, setActiveTab] = useState('inbox')

  useEffect(() => {
    setActiveTab(pageContext.type)
  }, [pageContext.type])

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
            isActiveTab={activeTab === 'label'}
            routerLinkBase="/app/label/"
            items={labels}
            noItemsPlaceholder="You don't have any labels"
            onItemClick={handleSidebarClose}
            TabActionComponent={
              <ButtonIcon
                name="plus"
                size="tiny"
                onClickFn={e => {
                  e.stopPropagation()
                  toggleAddLabelModal(true, 'label')
                }}
              />
            }
          />
        </div>

        <div className={styles.accordion}>
          <AccordionMenu
            title="Projects"
            isActiveTab={activeTab === 'project'}
            routerLinkBase="/app/project/"
            items={[]}
            noItemsPlaceholder="You don't have any projects"
            onItemClick={handleSidebarClose}
            TabActionComponent={
              <ButtonIcon
                name="plus"
                size="tiny"
                onClickFn={e => {
                  e.stopPropagation()
                  toggleAddLabelModal(true, 'project')
                }}
              />
            }
          />
        </div>
        {isAddLabelModalOpen && <AddLabelModal />}
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
  pageContext: PropTypes.shape({
    type: PropTypes.oneOf(config.pageTypes),
    id: PropTypes.string,
  }),
}

Sidebar.defaultProps = {
  pageContext: {
    type: 'inbox',
    id: '',
  },
}

const mapStateToProps = ({ auth, ui }) => ({
  isSidebarOpen: ui.isSidebarOpen,
  isAddLabelModalOpen: ui.isAddLabelModalOpen,
  labels: auth.user.labels,
})

const mapDispatchToProps = dispatch => ({
  hideSidebar: () => dispatch(toggleSidebar(false)),
  toggleAddLabelModal: (isOpen, type) => dispatch(toggleAddLabelModal(isOpen, type)),
})

export default compose(withPageContext, connect(mapStateToProps, mapDispatchToProps))(Sidebar)
