import React from 'react'
import PageContext from '../context/PageContext'
import PropTypes from 'prop-types'

const withPageContext = Component => {
  return function contextComponent(props) {
    return (
      <PageContext.Consumer>
        {context => <Component {...props} pageContext={context} />}
      </PageContext.Consumer>
    )
  }
}

withPageContext.propTypes = {
  Component: PropTypes.node.isRequired,
}

export default withPageContext
