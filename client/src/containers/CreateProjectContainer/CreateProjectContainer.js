import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import TextField from '../../components/atoms/TextField/TextField'
import Button from '../../components/atoms/Button/Button'
import FormErrorMessage from '../../components/atoms/FormErrorMessage/FormErrorMessage'
import FormWrapper from '../../templates/FormWrapper/FormWrapper'
import ColorPicker from '../../components/atoms/ColorPicker/ColorPicker'
import { createProject } from '../../store/projects/async-actions'
import { withRouter } from 'react-router'
import Label from '../../components/atoms/Label/Label'
import FlexBox from '../../templates/FlexBox/FlexBox'
import Heading from '../../components/atoms/Heading/Heading'

const DEFAULT_PROJECT_COLOR = '#ff0000'

class CreateProjectInner extends Component {
  handleColorSelect = color => {
    this.props.setFieldValue('color', color)
  }

  render() {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
    } = this.props

    return (
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <Heading primary>Create new project</Heading>
          <TextField
            isError={errors.name && touched.name}
            isSolid
            onChangeFn={handleChange}
            onBlurFn={handleBlur}
            inputValue={values.name}
            name="name"
            placeholder="Project name"
          />
          {errors.name && touched.name && <FormErrorMessage errors={errors.name} />}
          <TextField
            isError={errors.description && touched.description}
            isSolid
            onChangeFn={handleChange}
            onBlurFn={handleBlur}
            inputValue={values.description}
            name="description"
            type="textarea"
            placeholder="Project description (optional)"
          />
          {errors.desccription && touched.desccription && (
            <FormErrorMessage errors={errors.desccription} />
          )}
          <FlexBox center>
            <Label>Pick a color</Label>
            <ColorPicker selectedColor={values.color} onSelectColor={this.handleColorSelect} />
          </FlexBox>
          <Button block isSubmit isBlock primary disabled={isSubmitting}>
            Create
          </Button>
        </form>
      </FormWrapper>
    )
  }
}

const CreateProjectSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Project name needs to be at least 3 characters long')
    .required('Project name is required'),
  color: Yup.string().required('Color is required'),
  description: Yup.string(),
})

const CreateProjectContainer = withFormik({
  mapPropsToValues: () => ({
    name: '',
    color: DEFAULT_PROJECT_COLOR,
    description: '',
  }),
  validationSchema: CreateProjectSchema,

  async handleSubmit({ name, description, color }, { props }) {
    const projectData = {
      name,
      color,
      description,
    }

    const onSuccess = projectId => {
      props.history.push(`/app/project/${projectId}`)
    }

    props.createProject(projectData, onSuccess)
  },
})(CreateProjectInner)

CreateProjectInner.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  createProject: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

const mapDispatchToProps = dispatch => bindActionCreators({ createProject }, dispatch)

export default compose(withRouter, connect(null, mapDispatchToProps))(CreateProjectContainer)
