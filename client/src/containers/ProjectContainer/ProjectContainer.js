import React, { Component } from 'react'
import Loader from '../../components/atoms/Loader/Loader'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getSingleProject,
  removeProject,
  uploadProjectFiles,
  removeProjectFile,
} from '../../store/projects/async-actions'
import config from '../../config'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import ConfirmModal from '../../components/molecules/ConfirmModal/ConfirmModal'
import Modal from '../../portals/Modal'
import Heading from '../../components/atoms/Heading/Heading'
import Button from '../../components/atoms/Button/Button'
import IconSVG from '../../components/atoms/IconSVG/IconSVG'
import FlexBox from '../../templates/FlexBox/FlexBox'
import UploadModal from '../../components/organisms/UploadModal/UploadModal'
import FileList from '../../components/molecules/FileList/FileList'

class ProjectContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isConfirmModalOpen: false,
      isUploadModalOpen: false,
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
    const projectId = this.props.match.params.id
    this.props.uploadProjectFiles(projectId, chosenFiles)
    this.handleToggleUploadModal()
  }

  handleFileRemove = id => {
    const projectId = this.props.match.params.id
    this.props.removeProjectFile(projectId, id)
  }

  handleToggleUploadModal = () => {
    this.setState(state => ({
      isUploadModalOpen: !state.isUploadModalOpen,
    }))
  }

  extendProjectFilePath = path => {
    return `/${path}?auth=${this.props.authToken}`
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
          <Button
            primary
            asRouterLink
            goTo={`${match.url}/details`}
            IconComponent={<IconSVG name="list" fill={config.colors.white} size="20px" />}
          >
            Preview tasks
          </Button>
          <Button
            secondary
            onClickFn={this.handleToggleUploadModal}
            IconComponent={<IconSVG name="upload" fill={config.colors.white} size="20px" />}
          >
            Upload files
          </Button>
          <Button
            danger
            onClickFn={() => this.toggleConfirmModal(true)}
            IconComponent={<IconSVG name="minusBg" fill={config.colors.white} size="20px" />}
          >
            Remove project
          </Button>
        </FlexBox>
        <p>{project.description}</p>

        <section>
          <Heading primary center>
            Uploaded files
          </Heading>
          <FileList
            files={project.files}
            extendFilePath={this.extendProjectFilePath}
            onFileRemove={this.handleFileRemove}
          />
        </section>

        {this.state.isUploadModalOpen && (
          <Modal>
            <UploadModal
              onSubmit={this.handleOnSubmit}
              onCancel={this.handleToggleUploadModal}
              progress={this.props.uploadProgress}
            />
          </Modal>
        )}
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
    files: PropTypes.array,
  }),
  isLoading: PropTypes.bool.isRequired,
  getSingleProject: PropTypes.func.isRequired,
  removeProject: PropTypes.func.isRequired,
  uploadProjectFiles: PropTypes.func.isRequired,
  removeProjectFile: PropTypes.func.isRequired,
  uploadProgress: PropTypes.array,
  authToken: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
}

const mapStateToProps = ({
  projects: { project, isLoading, uploadProgress },
  auth: { authToken },
}) => ({
  project,
  isLoading,
  uploadProgress,
  authToken,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getSingleProject, removeProject, uploadProjectFiles, removeProjectFile },
    dispatch,
  )

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(ProjectContainer)
