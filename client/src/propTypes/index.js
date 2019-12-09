import PropTypes from 'prop-types'

// Some common PropType shapes
export const LabelOrProjectType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
})
