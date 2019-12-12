import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import mockAxios from 'axios'
import * as thunks from '../async-actions'
import { types } from '../types'
import { types as UItypes } from '../../ui/types'
import { types as NotificationTypes } from '../../notifications/types'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('tasks - thunks (redux)', () => {
  it('creates proper actions when getTasks function is called', async () => {
    const store = mockStore({ taskList: [] })
    const tasksResponseData = ['task1', 'task2']
    const expectedActions = [
      { type: types.GET_TASKS_BEGIN },
      { type: types.GET_TASKS_SUCCESS, payload: tasksResponseData },
    ]
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: tasksResponseData,
      }),
    )

    await store.dispatch(thunks.getTasks({}))

    expect(store.getActions()).toEqual(expectedActions)
  })

  it('creates proper actions when addTask function is called', async () => {
    const store = mockStore({ taskList: [] })
    const addedTaskData = {
      _id: '123',
      title: 'Task title',
    }
    const expectedActions = [
      { type: types.ADD_TASK_BEGIN },
      { type: types.ADD_TASK_SUCCESS, payload: addedTaskData },
      { type: UItypes.TOGGLE_ADD_TASK_MODAL, payload: false },
    ]
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: addedTaskData,
      }),
    )
    const cb = () => {}

    await store.dispatch(thunks.addTask({}, cb, cb))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('creates proper actions when updateTask function is called', async () => {
    const store = mockStore({ taskList: [] })
    const updatedTaskData = {
      _id: '123',
      title: 'Task title',
    }
    const expectedActions = [
      { type: types.UPDATE_TASK_BEGIN },
      { type: types.UPDATE_TASK_SUCCESS, payload: updatedTaskData },
    ]
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: updatedTaskData,
      }),
    )

    await store.dispatch(thunks.updateTask({}))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('creates proper actions when removeTask function is called', async () => {
    const store = mockStore({ taskList: [] })
    const taskId = '123'
    const removedTaskMsg = 'Task has been removed'
    const expectedActions = [
      { type: types.REMOVE_TASK_BEGIN },
      { type: types.REMOVE_TASK_SUCCESS, payload: taskId },
      {
        type: NotificationTypes.ADD_NOTIFICATION,
        payload: {
          id: expect.any(String),
          msg: removedTaskMsg,
          type: 'success',
        },
      },
    ]
    mockAxios.delete.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          msg: removedTaskMsg,
        },
      }),
    )

    await store.dispatch(thunks.removeTask(taskId))
    expect(store.getActions()).toEqual(expectedActions)
  })
})
