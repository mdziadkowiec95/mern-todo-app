import React from 'react'
import IconSVG from '../IconSVG/IconSVG'
import styles from './PriorityFlag.module.scss'
import cn from 'classnames'
import { PriorityType } from '../../../propTypes'
import PropTypes from 'prop-types'

const PriorityFlag = ({ priority, notActive }) => {
  const PriorityFlagClassName = cn(styles.priorityFlag, styles[priority], {
    [styles.notActive]: notActive,
  })

  return <IconSVG name="flag" className={PriorityFlagClassName} size="20px" />
}

PriorityFlag.propTypes = {
  priority: PriorityType,
  notActive: PropTypes.bool,
}

PriorityFlag.defaultProps = {
  notActive: false,
}

export default PriorityFlag
