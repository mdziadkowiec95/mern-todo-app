import React from 'react'
import PropTypes from 'prop-types'
import CreateProjectContainer from '../../../containers/CreateProjectContainer/CreateProjectContainer'

const CreateProject = ({ match }) => {
  return (
    <>
      {/* {match.path}
      <div>CreateProject</div> */}
      <CreateProjectContainer />
    </>
  )
}

CreateProject.propTypes = {
  match: PropTypes.object.isRequired,
}
export default CreateProject
