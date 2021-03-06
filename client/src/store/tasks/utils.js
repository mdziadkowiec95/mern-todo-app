// Serach for first item in items which date is bigger than provided item date
const getUpdatedListByDate = (items, itemData) => {
  const firstBiggerDateIndex = items.findIndex(
    item => new Date(item.date) > new Date(itemData.date),
  )
  if (firstBiggerDateIndex !== -1) {
    return [...items.slice(0, firstBiggerDateIndex), itemData, ...items.slice(firstBiggerDateIndex)]
  }

  return [...items, itemData]
}

// Detect if there is a need to update state after adding new task (check current view)
export const checkTaskContext = (pageContext, status, date, labels, projectId) => {
  if (pageContext.type === 'inbox' && status === 'inbox') {
    return 'inbox'
  }
  if (pageContext.type === 'label' && labels.findIndex(l => l._id === pageContext.id) !== -1) {
    return 'label'
  }
  if (pageContext.type === 'project' && projectId === pageContext.id) {
    return 'project'
  }
  if (date) {
    const dayStart = new Date()
    dayStart.setHours(0, 0, 0, 0)

    const dayEnd = new Date()
    dayEnd.setHours(23, 59, 59, 0)

    const dayAfterWeek = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)

    const taskDate = new Date(date)

    const isTodayTask = dayStart <= taskDate && taskDate <= dayEnd
    const isNextWeekTask = dayStart <= taskDate && taskDate <= dayAfterWeek

    if (pageContext.type === 'today' && isTodayTask) {
      return 'today'
    }
    if (pageContext.type === 'next-week' && isNextWeekTask) {
      return 'next-week'
    }
  }
}

export const getCurrentlyViewedTaskList = (state, payload) => {
  const { pageContext, taskList } = state
  const { status, date, labels, project } = payload
  const projectId = project ? project._id : null

  const taskContext = checkTaskContext(pageContext, status, date, labels, projectId)

  if (!taskContext) return taskList

  if (taskContext === 'inbox') {
    return [...taskList, payload]
  }

  if (
    taskContext === 'project' ||
    taskContext === 'label' ||
    taskContext === 'today' ||
    taskContext === 'next-week'
  ) {
    return getUpdatedListByDate(taskList, payload)
  }

  return [...taskList, payload]
}

export const getUpdatedTaskList = (state, payload) => {
  const { pageContext, taskList } = state

  const { status, date, labels, project } = payload
  const projectId = project ? project._id : null

  const taskContext = checkTaskContext(pageContext, status, date, labels, projectId)

  const updatedTaskIndex = taskList.findIndex(task => task._id === payload._id)

  if (updatedTaskIndex === -1) return taskList

  taskList.splice(updatedTaskIndex, 1)

  let updatedTaskList = [...taskList]
  // if task context has not been changed after update then update task in store
  // else remove the task from current view
  if (pageContext.type === 'inbox' || (taskContext && pageContext.type === taskContext)) {
    const firstBiggerDateTaskIndex = taskList.findIndex(task => {
      if (task && task.date && task.date > date) {
        return true
      }
      return false
    })

    console.log(firstBiggerDateTaskIndex)

    if (firstBiggerDateTaskIndex !== -1) {
      updatedTaskList = [
        ...taskList.slice(0, firstBiggerDateTaskIndex),
        payload,
        ...taskList.slice(firstBiggerDateTaskIndex, taskList.length),
      ]
    } else {
      updatedTaskList.push(payload)
    }
  } else {
    updatedTaskList.splice(updatedTaskIndex, 1)
  }
  return updatedTaskList
}
