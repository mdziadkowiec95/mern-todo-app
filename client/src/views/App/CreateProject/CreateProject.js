import React from 'react'
import PropTypes from 'prop-types'

const CreateProject = ({ match }) => {
  return (
    <>
      {match.path}
      <div>CreateProject</div>
      <ul>
        <li>
          <p>1. Add form to create project (without specifing tasks):</p>
          <p>- name</p>
          <p>- color</p>
          <p>- description</p>
          <p>- external resources</p>
        </li>
        <li>
          2. Redirect to proper route after successful form submision (based on returned project
          _id)
        </li>
      </ul>
    </>
  )
}

CreateProject.propTypes = {
  match: PropTypes.object.isRequired,
}
export default CreateProject
