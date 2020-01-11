import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import Button from '../../atoms/Button/Button'
import cn from 'classnames'
import styles from './AddTaskModal.module.scss'
import TextField from '../../atoms/TextField/TextField'
import DatePicker from '../../atoms/DatePicker/DatePicker'
import FormErrorMessage from '../../atoms/FormErrorMessage/FormErrorMessage'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addTask } from '../../../store/tasks/async-actions'
import MultiSelect from '../MultiSelect/MultiSelect'
import SelectDropdown from '../../atoms/SelectDropdown/SelectDropdown'
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon'
import { toggleAddTaskModal } from '../../../store/ui/actions'
import RadioButtonField from '../../atoms/RadioButtonField/RadioButtonField'
import { LabelOrProjectType } from '../../../propTypes'
import PriorityPicker from '../PriorityPicker/PriorityPicker'

const TaskPriorityOptions = [
  {
    label: 'Low',
    value: 'low',
  },
  {
    label: 'Normal',
    value: 'normal',
  },
  {
    label: 'High',
    value: 'high',
  },
]

const TaskStatusOptions = [
  {
    label: 'Inbox',
    value: 'inbox',
  },
  {
    label: 'Scheduled',
    value: 'active',
  },
]

const AddTaskModalBase = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    userLabels,
    userProjects,
    toggleAddTaskModal,
  } = props

  useEffect(() => {
    if (values.date) {
      setFieldValue('status', 'active')
    } else {
      setFieldValue('status', 'inbox')
    }
  }, [values.date, setFieldValue])

  const handleLabelSelect = labelId => {
    const selectedLabel = userLabels.find(label => label._id === labelId)
    setFieldValue('labels', [...values.labels, selectedLabel])
  }

  const handleLabelRemove = labelId => {
    setFieldValue(
      'labels',
      values.labels.filter(label => label._id !== labelId),
    )
  }

  const handleStatusChange = e => {
    const status = e.target.value

    if (status === 'inbox') {
      setFieldValue('date', null)
      setFieldValue('status', 'inbox')
    }
  }

  const handlePriorityChange = priority => {
    if (priority) setFieldValue('priority', priority)
  }

  const FormWrapperClassName = cn(styles.wrapper)

  return (
    <div className={FormWrapperClassName}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <ButtonIcon
          name="closeBorder"
          className={styles.closeBtn}
          onClickFn={() => toggleAddTaskModal(false)}
        />
        <div className={styles.content}>
          <TextField
            isError={errors.title && touched.title}
            isSolid
            type="textarea"
            onChangeFn={handleChange}
            onBlurFn={handleBlur}
            inputValue={values.title}
            placeholder="Enter task title..."
            name="title"
          />
          {errors.title && touched.title && <FormErrorMessage errors={errors.title} />}

          <MultiSelect
            labels={{
              add: 'Add labels:',
              textOpen: 'Choose labels from the list',
              allItemsSelected: 'All labels are selected',
              noItemsAvailable: `You don't have any labels`,
            }}
            options={userLabels}
            selectedOptions={values.labels}
            onSelect={handleLabelSelect}
            onRemove={handleLabelRemove}
          />

          <div className={styles.doubleItemWrap}>
            <SelectDropdown
              id="projectId"
              name="projectId"
              defaultOption="Select a project"
              selectedValue={values.projectId}
              options={userProjects}
              className={styles.doubleItemWrapChild}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <div className={styles.doubleItemWrapChild}>
              <div className={styles.labeledBtn}>
                <p className={styles.label}>Date</p>
                <DatePicker
                  selectedDate={values.date}
                  setDate={dateValue => setFieldValue('date', dateValue)}
                  placeholder="Pick a date"
                  withIcon
                  minDate={new Date()}
                />
              </div>
              <div className={styles.labeledBtn}>
                <p className={styles.label}>Priority</p>
                <PriorityPicker
                  selectedPriority={values.priority}
                  onSelect={handlePriorityChange}
                  className={styles.priorityPicker}
                />
              </div>
            </div>
          </div>

          {/* <RadioButtonField
            fieldTitle="Set priority"
            name="priority"
            selectedRadio={values.priority}
            data={TaskPriorityOptions}
            onChange={handleChange}
            center
          /> */}

          <RadioButtonField
            fieldTitle="Task status"
            name="status"
            selectedRadio={values.status}
            data={TaskStatusOptions}
            onChange={handleStatusChange}
            center
          />

          <Button primary isSubmit block>
            Add task
          </Button>
        </div>
      </form>
    </div>
  )
}

const AddTaskModalValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Title needs to be at least 2 characters long')
    .max(50, 'Title can include at most 50 characters')
    .required('Title is required'),
  priority: Yup.string().required('priority is required'),
  status: Yup.string().required('Status is required'),
})

const AddTaskModal = withFormik({
  mapPropsToValues: () => ({
    title: '',
    priority: 'normal',
    status: 'inbox',
    projectId: '',
    labels: [],
    date: null,
  }),

  // Custom sync validation
  validationSchema: AddTaskModalValidationSchema,

  handleSubmit: (values, { props, setSubmitting }) => {
    const taskPayload = {
      ...values,
      labelsIDs: values.labels.map(label => label._id),
    }

    const onSuccess = () => {
      window.scrollTo(0, document.body.scrollHeight)
      setSubmitting(false)
    }

    const onError = () => {
      setSubmitting(false)
    }
    // alert(JSON.stringify(taskPayload, 2, null))
    props.addTask(taskPayload, onSuccess, onError)
  },

  displayName: 'AddTaskForm',
})(AddTaskModalBase)

AddTaskModalBase.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string,
    status: PropTypes.string,
    priority: PropTypes.string,
    projectId: PropTypes.string,
    userLabels: PropTypes.arrayOf(LabelOrProjectType),
    userProjects: PropTypes.arrayOf(LabelOrProjectType),
    date: PropTypes.object,
  }),
  errors: PropTypes.any,
  touched: PropTypes.any,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  user: PropTypes.object,
  toggleAddTaskModal: PropTypes.func.isRequired,
}

const mapStateToProps = ({ preferences: { labels, projects }, ui }) => ({
  isAddTaskModalOpen: ui.isAddTaskModalOpen,
  userLabels: labels,
  userProjects: projects,
})

const mapDispatchToProps = dispatch => bindActionCreators({ addTask, toggleAddTaskModal }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskModal)
