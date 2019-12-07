import { types } from './types'
import { de } from 'date-fns/locale'

const MOCK_INITIAL_STATE = []

const priorities = ['low', 'normal', 'high']
for (let i = 0; i < 10; i += 1) {
  MOCK_INITIAL_STATE.push({
    priority: priorities[Math.floor(Math.random() * 3)],
    status: 'active',
    _id: `${i}`,
    user: '5db48b795dd65f0609cc7e72',
    title: 'Test status',
    date: i % 2 === 0 ? '2019-10-26T09:00:00.000Z' : undefined,
    labels: [
      {
        _id: '5dbb4206b107e20a76ebb8a7',
        name: 'Work is damn good!',
        color: '#fff',
      },
    ],
    __v: 0,
  })
}

const initialState = {
  pageContext: {},
  taskList: [],
  isLoading: false,
}

// Detect if there is a need to update state after adding new task (check current view)
const checkTaskContext = (pageContext, status, date, labels, projectId) => {
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
    dayEnd.setHours(23, 59, 59, 999)

    const dayAfterWeek = new Date(String(new Date() + 7 * 24 * 60 * 60 * 1000)) 

    const taskDate = new Date(date)

    const isTodayTask = dayStart < taskDate && taskDate < dayEnd
    const isNextWeekTask = dayStart < taskDate && taskDate < dayAfterWeek
  
    if (pageContext.type === 'today' && isTodayTask) {
      return 'today'
    }
    if (pageContext.type === 'next-week' && isNextWeekTask) {
      return 'next-week'
    }
  }
}

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

const getUpdatedTaskList = (state, payload) => {
  const { pageContext, taskList } = state
  const { status, date, labels, projectId } = payload

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

export const tasksReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case types.GET_TASKS_BEGIN:
    case types.ADD_TASK_BEGIN:
    case types.REMOVE_TASK_BEGIN:
      return {
        ...state,
        isLoading: true,
      }
    case types.GET_TASKS_SUCCESS:
      return {
        ...state,
        pageContext: payload.pageContext,
        taskList: payload.taskList,
        isLoading: false,
      }

    case types.ADD_TASK_SUCCESS:
      return {
        ...state,
        taskList: getUpdatedTaskList(state, payload),
        isLoading: false,
      }

    case types.REMOVE_TASK_SUCCESS:
      return {
        ...state,
        taskList: state.taskList.filter(task => task._id !== payload),
        isLoading: false,
      }
    case types.GET_TASKS_ERROR:
    case types.ADD_TASK_ERROR:
    case types.REMOVE_TASK_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}