import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cn from 'classnames'
import styles from './Sidebar.module.scss'
import Accordion from '../../molecules/Accordion/Accordion'
import ButtonLink from '../../atoms/ButtonLink/ButtonLink'
import { toggleSidebar, toggleAddLabelModal } from '../../../store/ui/actions'
import { compose } from 'redux'
import withPageContext from '../../../hoc/withPageContext'
import config from '../../../config'
import ColorPicker from '../../molecules/ColorPicker/ColorPicker'
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon'
import AddLabelModal from '../../molecules/AddLabelModal/AddLabelModal'

const Sidebar = ({
  isSidebarOpen,
  isAddLabelModalOpen,
  toggleAddLabelModal,
  hideSidebar,
  pageContext,
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
          <Accordion
            title="Labels"
            isActiveTab={activeTab === 'label'}
            TabActionComponent={
              <ButtonIcon
                name="plus"
                size="tiny"
                onClickFn={e => {
                  e.stopPropagation()
                  toggleAddLabelModal(true)
                }}
              />
            }
          >
            <ul>
              <li>
                <ButtonLink
                  href="/app/label/1"
                  className={styles}
                  asNavLink
                  onClick={handleSidebarClose}
                >
                  Label 1
                </ButtonLink>
              </li>
              <li>
                <ButtonLink href="/app/label/2" asNavLink onClick={handleSidebarClose}>
                  Label 2
                </ButtonLink>
              </li>
              <li>
                <ButtonLink href="/app/label/3" asNavLink onClick={handleSidebarClose}>
                  Label 3
                </ButtonLink>
              </li>
              <li>
                <ButtonLink href="/app/label/4" asNavLink onClick={handleSidebarClose}>
                  Label 4
                </ButtonLink>
              </li>
            </ul>
          </Accordion>
        </div>
        <div className={styles.accordion}>
          <Accordion
            title="Projects"
            isActiveTab={activeTab === 'project'}
            TabActionComponent={
              <ButtonIcon
                name="plus"
                size="tiny"
                onClickFn={e => {
                  e.stopPropagation()
                  alert('add project')
                }}
              />
            }
          >
            <ul>
              <li>
                <ButtonLink href="/app/project/1" asNavLink onClick={handleSidebarClose}>
                  Project 1
                </ButtonLink>
              </li>
              <li>
                <ButtonLink href="/app/project/2" asNavLink onClick={handleSidebarClose}>
                  Project 2
                </ButtonLink>
              </li>
              <li>
                <ButtonLink href="/app/project/3" asNavLink onClick={handleSidebarClose}>
                  Project 3
                </ButtonLink>
              </li>
              <li>
                <ButtonLink href="/app/project/4" asNavLink onClick={handleSidebarClose}>
                  Project 4
                </ButtonLink>
              </li>
            </ul>
          </Accordion>
          {isAddLabelModalOpen && <AddLabelModal />}
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

const mapStateToProps = ({ ui }) => ({
  isSidebarOpen: ui.isSidebarOpen,
  isAddLabelModalOpen: ui.isAddLabelModalOpen,
})

const mapDispatchToProps = dispatch => ({
  hideSidebar: () => dispatch(toggleSidebar(false)),
  toggleAddLabelModal: isOpen => dispatch(toggleAddLabelModal(isOpen)),
})

export default compose(withPageContext, connect(mapStateToProps, mapDispatchToProps))(Sidebar)
