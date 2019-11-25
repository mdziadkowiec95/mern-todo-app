import React from 'react'
import PropTypes from 'prop-types'
import styles from './TaskListTemplate.module.scss'
import cn from 'classnames'
import Loader from '../../components/atoms/Loader/Loader'

const TaskListTemplate = ({ children, isLoading }) => {
  const ListWrapperClassName = cn(styles.listWrapper, {
    [styles.isLoading]: isLoading,
  })
  return (
    <div className={styles.wrapper}>
      <ul className={ListWrapperClassName}>
        {isLoading && <Loader isLarge inWrapper absoluteCenter />}
        {children}
      </ul>
    </div>
  )
}

TaskListTemplate.propTypes = {
  children: PropTypes.node.isRequired,
}

export default TaskListTemplate
