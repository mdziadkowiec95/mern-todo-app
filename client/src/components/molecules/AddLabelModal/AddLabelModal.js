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

const AddLabelModalBase = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  toggleAddLabelModal,
}) => {
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
          placeholder="Enter label name"
          onChangeFn={handleChange}
          onBlurFn={handleBlur}
          inputValue={values.name}
          isSolid
        />
        {errors.name && touched.name && <FormErrorMessage errors={errors.name} />}
        <Label center className={styles.label}>
          Pick a color
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
    alert(JSON.stringify(values, 2, null))

    setSubmitting(false)
  },

  displayName: 'AddLabelModal',
})(AddLabelModalBase)

const mapStateToProps = ({ ui: { isAddLabelModalOpen } }) => ({
  isAddLabelModalOpen,
})

const mapDispatchToProps = dispatch => bindActionCreators({ toggleAddLabelModal }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddLabelModal)
