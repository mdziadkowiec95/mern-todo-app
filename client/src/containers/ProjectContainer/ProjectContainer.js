import React, { Component } from 'react'
import Loader from '../../components/atoms/Loader/Loader'
import ButtonIcon from '../../components/atoms/ButtonIcon/ButtonIcon'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getSingleProject,
  removeProject,
  uploadProjectFiles,
} from '../../store/projects/async-actions'
import config from '../../config'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import ConfirmModal from '../../components/molecules/ConfirmModal/ConfirmModal'
import Modal from '../../portals/Modal'
import Heading from '../../components/atoms/Heading/Heading'
import Button from '../../components/atoms/Button/Button'
import FlexBox from '../../templates/FlexBox/FlexBox'
import UploadModal from '../../components/organisms/UploadModal/UploadModal'

class ProjectContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isConfirmModalOpen: false,
    }
  }

  componentDidMount() {
    const storedProjectIdChanged = this.props.project
      ? this.props.project._id !== this.props.match.params.id
      : true

    if (storedProjectIdChanged) this.fetchProjectData()
  }

  componentDidUpdate(prevProps) {
    const projectIdParamChanged = prevProps.match.params.id !== this.props.match.params.id

    const storedProjectIdChanged = this.props.project
      ? this.props.project._id !== this.props.match.params.id
      : true

    if (projectIdParamChanged && storedProjectIdChanged) this.fetchProjectData()
  }

  fetchProjectData() {
    const { getSingleProject, match } = this.props
    const projectId = match.params.id

    getSingleProject(projectId)
  }

  onRemoveSuccess() {
    this.props.history.push('/app/inbox')
  }

  toggleConfirmModal(isOpen) {
    this.setState({
      isConfirmModalOpen: isOpen,
    })
  }

  handleOnSubmit = chosenFiles => {
    const formData = new FormData()
    formData.append('projectId', this.props.match.params.id)

    for (const file of chosenFiles) {
      formData.append('projectFiles', file.fileData, file.fileData.name)
    }

    this.props.uploadProjectFiles(formData)
  }

  render() {
    const { project, removeProject, isLoading, match } = this.props

    if (isLoading) return <Loader fullScreen />
    if (!isLoading && (!project || !project._id)) return <p>Project does not exist</p>

    return (
      <div>
        <Heading primary center>
          {project.name}
        </Heading>
        <FlexBox center>
          <Button primary asRouterLink goTo={`${match.url}/details`}>
            Preview tasks
          </Button>
          <ButtonIcon
            name="minusBg"
            color={config.colors['error-bg']}
            onClickFn={() => this.toggleConfirmModal(true)}
          />
        </FlexBox>
        <p>{project.description}</p>
        <h1>TODO:</h1>
        <div>
          <h3>1. Show task data:</h3>
          <p>- title</p>
          <p>- description</p>
          <p>- color label</p>
          <p>
            - posibility to add images ??? (with limit up to 4?) (multer npm package)... Gallery
            component example (https://blog.alexdevero.com/learn-react-practice-create-gallery/)
          </p>
          <p>- posibility to add external links</p>
        </div>

        <UploadModal onSubmit={this.handleOnSubmit} progress={this.props.uploadProgress} />

        {this.state.isConfirmModalOpen && (
          <Modal>
            <ConfirmModal
              descriptionText="Project will be removed also from all tasks in which it occurs."
              onConfirm={() => removeProject(project._id, () => this.onRemoveSuccess())}
              onCancel={() => this.toggleConfirmModal(false)}
            />
          </Modal>
        )}
      </div>
    )
  }
}

ProjectContainer.propTypes = {
  history: PropTypes.object.isRequired,
  project: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.string,
    description: PropTypes.string,
  }),
  isLoading: PropTypes.bool.isRequired,
  getSingleProject: PropTypes.func.isRequired,
  removeProject: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
}

const mapStateToProps = ({ projects: { project, isLoading, uploadProgress } }) => ({
  project,
  isLoading,
  uploadProgress,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getSingleProject, removeProject, uploadProjectFiles }, dispatch)

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(ProjectContainer)
