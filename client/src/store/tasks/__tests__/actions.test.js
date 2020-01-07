import * as actions from '../actions'
import { types } from '../types'

describe('tasks - action creators (redux)', () => {
  it('should create GET_TASKS_SUCCESS action properly', () => {
    const tasks = ['task1', 'task2']
    const expectedAction = {
      type: types.GET_TASKS_SUCCESS,
      payload: tasks,
    }
    expect(actions.getTasksSuccess(tasks)).toEqual(expectedAction)
  })

  it('should create SET_PAGE_CONTEXT action properly', () => {
    const pageContext = {
      type: 'inbox',
      id: '123',
    }
    const expectedAction = {
      type: types.SET_PAGE_CONTEXT,
      payload: pageContext,
    }
    expect(actions.setPageContext(pageContext)).toEqual(expectedAction)
  })

  it('should create ADD_TASK_SUCCESS action properly', () => {
    const taskData = {
      _id: '123',
      title: 'Some title',
    }
    const expectedAction = {
      type: types.ADD_TASK_SUCCESS,
      payload: taskData,
    }
    expect(actions.addTaskSuccess(taskData)).toEqual(expectedAction)
  })

  it('should create UPDATE_TASK_SUCCESS action properly', () => {
    const taskData = {
      _id: '123',
      title: 'Some title',
    }
    const expectedAction = {
      type: types.UPDATE_TASK_SUCCESS,
      payload: taskData,
    }
    expect(actions.updateTaskSuccess(taskData)).toEqual(expectedAction)
  })

  it('should create REMOVE_TASK_SUCCESS action properly', () => {
    const taskId = '123'
    const expectedAction = {
      type: types.REMOVE_TASK_SUCCESS,
      payload: taskId,
    }
    expect(actions.removeTaskSuccess(taskId)).toEqual(expectedAction)
  })
})
