import React from 'react'
import ColorPicker from '../../atoms/ColorPicker/ColorPicker'
import styles from './AddLabelModal.module.scss'
import TextField from '../../atoms/TextField/TextField'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon'
import FormErrorMessage from '../../atoms/FormErrorMessage/FormErrorMessage'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Label from '../../atoms/Label/Label'
import { addLabel, editLabel } from '../../../store/preferences/async-actions'
import PropTypes from 'prop-types'
import Button from '../../atoms/Button/Button'

const AddLabelModalBase = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  onCancel,
  existingLabel,
}) => {
  return (
    <div className={styles.wrapper}>
      <ButtonIcon name="arrowFullRight" centerInWrap onClickFn={onCancel} title="Add new label" />
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          isError={errors.name && touched.name}
          name="name"
          placeholder="Enter new label name"
          onChangeFn={handleChange}
          onBlurFn={handleBlur}
          inputValue={values.name}
          isSolid
        />
        {errors.name && touched.name && <FormErrorMessage errors={errors.name} />}
        <Label center className={styles.label}>
          {existingLabel ? 'Change label color' : 'Pick label color'}
        </Label>
        {errors.color && touched.color && <FormErrorMessage errors={errors.color} />}
        <ColorPicker
          selectedColor={values.color}
          onSelectColor={color => setFieldValue('color', color)}
        />
        <div className={styles.addLabelBtnWrap}>
          <Button isSubmit primary>
            Done
          </Button>
        </div>
      </form>
    </div>
  )
}

const AddTaskModalValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Label name needs to be at least 2 characters long')
    .max(15, 'Label name can include at most 15 characters')
    .required('Label name is required'),
  color: Yup.string().required('You need to pick a color'),
})

const AddLabelModal = withFormik({
  mapPropsToValues: ({ existingLabel }) => ({
    name: existingLabel.name,
    color: existingLabel.color,
  }),

  // Custom sync validation
  validationSchema: AddTaskModalValidationSchema,

  handleSubmit: async (values, { props, setSubmitting }) => {
    const { name, color } = values

    if (props.existingLabel && props.existingLabel._id) {
      await props.editLabel(props.existingLabel._id, name, color)
      props.onCancel()
    } else {
      await props.addLabel(name, color)
      setSubmitting(false)
      props.onCancel()
    }
  },

  displayName: 'AddLabelModal',
})(AddLabelModalBase)

AddLabelModalBase.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  setFieldValue: PropTypes.func,
  onCancel: PropTypes.func,
  existingLabel: PropTypes.object,
}

const mapDispatchToProps = dispatch => bindActionCreators({ addLabel, editLabel }, dispatch)

export default connect(null, mapDispatchToProps)(AddLabelModal)
