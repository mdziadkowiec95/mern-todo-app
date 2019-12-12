import { types } from './types'
import { getCurrentlyViewedTaskList, getUpdatedTaskList } from './utils'

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

export const initialState = {
  pageContext: {
    type: 'inbox',
    id: '',
  },
  taskList: [],
  isLoading: false,
}

export const tasksReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case types.SET_PAGE_CONTEXT:
      return {
        ...state,
        pageContext: payload,
      }
    case types.GET_TASKS_BEGIN:
    case types.ADD_TASK_BEGIN:
    case types.UPDATE_TASK_BEGIN:
    case types.REMOVE_TASK_BEGIN:
      return {
        ...state,
        isLoading: true,
      }
    case types.GET_TASKS_SUCCESS:
      return {
        ...state,
        taskList: payload,
        isLoading: false,
      }

    case types.ADD_TASK_SUCCESS:
      return {
        ...state,
        taskList: getCurrentlyViewedTaskList(state, payload),
        isLoading: false,
      }
    case types.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        taskList: getUpdatedTaskList(state.taskList, payload),
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
    case types.UPDATE_TASK_ERROR:
    case types.REMOVE_TASK_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
