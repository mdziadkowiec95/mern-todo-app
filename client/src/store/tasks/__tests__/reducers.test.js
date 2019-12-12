import { tasksReducer, initialState } from '../reducers'
import { types } from '../types'
import * as actions from '../actions'

const exampleNotification = {
  id: '123',
  type: 'success',
  msg: 'You did it!',
}

describe('tasks - reducer (redux)', () => {
  it('should return the initial state no action is dispatched', () => {
    expect(tasksReducer(undefined, {})).toEqual(initialState)
  })

  it('should store an array of tasks when GET_TASKS_SUCCESS is dispatched', () => {
    const tasks = ['task1', 'task2', 'task3']
    expect(tasksReducer(undefined, actions.getTasksSuccess(tasks))).toEqual({
      ...initialState,
      taskList: tasks,
    })
  })

  // TODO --- create tests for tasks dates (based on page context)
})
