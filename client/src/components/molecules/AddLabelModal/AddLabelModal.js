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
import { toggleAddLabelModal } from '../../../store/ui/actions'
import Label from '../../atoms/Label/Label'
import { addLabel } from '../../../store/auth/thunks'
import PropTypes from 'prop-types'

const AddLabelModalBase = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  modalType,
  toggleAddLabelModal,
}) => {
  const namePlaceholder = modalType === 'project' ? 'Enter project name' : 'Enter label name'
  const colorPickerLabel = modalType === 'project' ? 'Pick project color' : 'Pick label color'

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <ButtonIcon
          name="closeBorder"
          className={styles.closeBtn}
          onClickFn={() => toggleAddLabelModal(false)}
        />
        <TextField
          isError={errors.name && touched.name}
          name="name"
          placeholder={namePlaceholder}
          onChangeFn={handleChange}
          onBlurFn={handleBlur}
          inputValue={values.name}
          isSolid
        />
        {errors.name && touched.name && <FormErrorMessage errors={errors.name} />}
        <Label center className={styles.label}>
          {colorPickerLabel}
        </Label>
        {errors.color && touched.color && <FormErrorMessage errors={errors.color} />}
        <ColorPicker
          selectedColor={values.color}
          onSelectColor={color => setFieldValue('color', color)}
        />
        <div className={styles.addLabelBtnWrap}>
          <ButtonIcon type="submit" name="plusBackground" />
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
  mapPropsToValues: () => ({
    name: '',
    color: '',
  }),

  // Custom sync validation
  validationSchema: AddTaskModalValidationSchema,

  handleSubmit: (values, { props, setSubmitting }) => {
    const { name, color } = values

    const onSuccess = () => {
      setSubmitting(false)
    }
    const onError = onSuccess

    if (props.modalType === 'label') {
      props.addLabel(name, color, onSuccess, onError)
    } else {
      alert('add project ')
    }

    setSubmitting(false)
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
  modalType: PropTypes.string.isRequired,
  toggleAddLabelModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({ ui }) => ({
  modalType: ui.addLabelModalType,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleAddLabelModal, addLabel }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddLabelModal)
