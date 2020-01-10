import PropTypes from 'prop-types'
import config from '../config'

// Some common PropType shapes
export const LabelOrProjectType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
})

export const PriorityType = PropTypes.oneOf(config.taskPriorities)
