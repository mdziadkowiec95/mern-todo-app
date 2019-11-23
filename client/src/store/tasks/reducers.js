import { types } from './types'

const MOCK_INITIAL_STATE = []

const priorities = ['low', 'normal', 'high']
for (let i = 0; i < 10; i += 1) {
  MOCK_INITIAL_STATE.push({
    priority: priorities[Math.floor(Math.random() * 3)],
    status: 'active',
    _id: `${i}`,
    user: '5db48b795dd65f0609cc7e72',
    title: 'Test status',
    date: '2019-10-26T09:00:00.000Z',
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
  taskList: [...MOCK_INITIAL_STATE],
  isLoading: false,
}

export const tasksReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case types.GET_TASKS_BEGIN:
      return {
        ...state,
        isLoading: true,
      }
    case types.GET_TASKS_SUCCESS:
      return {
        ...state,
        taskList: payload.taskList,
        isLoading: false,
      }
    case types.GET_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}
