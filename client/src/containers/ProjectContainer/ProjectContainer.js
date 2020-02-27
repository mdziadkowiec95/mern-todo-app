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
import ContentWrapper from '../../templates/ContentWrapper/ContentWrapper'
import ColorPicker from '../../components/atoms/ColorPicker/ColorPicker'
import Label from '../../components/atoms/Label/Label'
import ColorDot from '../../components/atoms/ColorDot/ColorDot'
import ButtonIcon from '../../components/atoms/ButtonIcon/ButtonIcon'
import TextField from '../../components/atoms/TextField/TextField'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { updateProjectBaseInfo } from '../../store/projects/async-actions'

class ProjectContainerInner extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isConfirmModalOpen: false,
      isUploadModalOpen: false,
      isEditMode: false,
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

  toggleEditMode = () => {
    this.setState(state => ({
      isEditMode: !state.isEditMode,
    }))
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

  cancelEditMode = () => {
    const { name, color, description } = this.props.project
    this.props.setValues({ name, color, description })
    this.toggleEditMode()
  }

  handleFormSubmit = e => {
    this.props.handleSubmit(e)
    this.toggleEditMode()
  }

  extendProjectFilePath = path => {
    return `/${path}?auth=${this.props.authToken}`
  }

  render() {
    const {
      project,
      removeProject,
      isLoading,
      match,
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      isSubmitting,
      setFieldValue,
    } = this.props
    const { isEditMode } = this.state

    if (isLoading) return <Loader fullScreen />
    if (!isLoading && (!project || !project._id)) return <p>Project does not exist</p>

    return (
      <ContentWrapper>
        <form onSubmit={this.handleFormSubmit}>
          {!isEditMode && !isSubmitting ? (
            <FlexBox spaceBetween>
              <ButtonIcon name="edit" size="small" onClickFn={this.toggleEditMode} />
              <ColorDot color={project.color} />
            </FlexBox>
          ) : (
            <FlexBox spaceBetween>
              <FlexBox>
                <Button secondary small onClickFn={this.cancelEditMode}>
                  Cancel
                </Button>
                <Button isSubmit primary small disabled={isSubmitting}>
                  Save
                </Button>
              </FlexBox>
              <FlexBox centerMd>
                <Label>Pick a color</Label>
                <ColorPicker
                  selectedColor={values.color}
                  onSelectColor={color => setFieldValue('color', color)}
                  direction="rtl"
                />
              </FlexBox>
            </FlexBox>
          )}

          {!isEditMode && !isSubmitting ? (
            <>
              <Heading primary center>
                {project.name}
              </Heading>
              <p>{project.description}</p>
            </>
          ) : (
            <>
              <TextField
                isError={errors.name && touched.name}
                isSolid
                onChangeFn={handleChange}
                onBlurFn={handleBlur}
                inputValue={values.name}
                name="name"
                placeholder="Enter project name"
              />
              <TextField
                isError={errors.description && touched.description}
                isSolid
                type="textarea"
                onChangeFn={handleChange}
                onBlurFn={handleBlur}
                inputValue={values.description}
                name="description"
                placeholder="Enter project description"
              />
            </>
          )}
        </form>

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
      </ContentWrapper>
    )
  }
}

const ProjectBaseInfoSchema = Yup.object().shape({
  name: Yup.string().required('Project name is required'),
  color: Yup.string().required('Project color is required'),
})

const ProjectContainer = withFormik({
  mapPropsToValues: ({ project }) => {
    if (project) {
      return {
        name: project.name,
        color: project.color,
        description: project.description,
      }
    }
  },
  enableReinitialize: true,
  validationSchema: ProjectBaseInfoSchema,

  handleSubmit: async ({ name, color, description }, { props }) => {
    await props.updateProjectBaseInfo({
      _id: props.project._id,
      name,
      description,
      color,
    })
  },
})(ProjectContainerInner)

ProjectContainerInner.propTypes = {
  history: PropTypes.object.isRequired,
  project: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    color: PropTypes.string,
    description: PropTypes.string,
    files: PropTypes.array,
  }),
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getSingleProject: PropTypes.func.isRequired,
  removeProject: PropTypes.func.isRequired,
  uploadProjectFiles: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  removeProjectFile: PropTypes.func.isRequired,
  uploadProgress: PropTypes.array,
  authToken: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
}

ProjectContainerInner.defaultProps = {
  project: {
    _id: null,
    name: '',
    color: '#ff0000',
    description: '',
    files: [],
  },
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
    {
      getSingleProject,
      removeProject,
      uploadProjectFiles,
      removeProjectFile,
      updateProjectBaseInfo,
    },
    dispatch,
  )

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(ProjectContainer)
