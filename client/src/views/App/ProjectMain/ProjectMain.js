import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from '../../../components/atoms/Button/Button'
import config from '../../../config'
import { setPageContext } from '../../../store/tasks/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const ProjectMain = ({ match, pageType, setPageContext }) => {
  // TEMPORARY - maybe it would be better to create HOC for setting pageContext
  useEffect(() => {
    const pageContext = {
      type: pageType,
      id: match.params.id,
    }

    setPageContext(pageContext)
  }, [])

  return (
    <div>
      <h1>Project tasks</h1>
      <Button primary asRouterLink goTo={`${match.url}/details`}>
        Preview tasks
      </Button>
    </div>
  )
}

ProjectMain.propTypes = {
  match: PropTypes.object.isRequired,
  pageType: PropTypes.oneOf(config.pageTypes),
  setPageContext: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => bindActionCreators({ setPageContext }, dispatch)

export default connect(null, mapDispatchToProps)(ProjectMain)
