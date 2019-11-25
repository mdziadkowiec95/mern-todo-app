import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Sidebar from '../../components/organisms/Sidebar/Sidebar'
import styles from './AppLayoutTemplate.module.scss'
import PageContext from '../../context/PageContext'
import config from '../../config'

const AppLayoutTemplate = ({ children, location, match }) => {
  const [pageContextValue, setPageType] = useState({
    type: '',
    id: '',
  })
  const setPageContext = () => {
    const pageTypes = config.pageTypes
    const { pathname } = location
    const [currentPageType] = pageTypes.filter(type => type !== '' && pathname.includes(type))
    const id = match.params.id ? match.params.id : ''

    if (currentPageType)
      setPageType({
        type: currentPageType,
        id,
      })
  }
  useEffect(() => {
    setPageContext()
  }, [])

  useEffect(() => {
    setPageContext()
  }, [location.pathname, match.params.id])

  return (
    <PageContext.Provider value={pageContextValue}>
      <div className={styles.main}>
        <Sidebar />
        <div className={styles.content}>{children}</div>
      </div>
    </PageContext.Provider>
  )
}

AppLayoutTemplate.propTypes = {
  children: PropTypes.node,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
export default withRouter(AppLayoutTemplate)
