import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as thunks from './thunks'
import { types } from './types'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates ADD_NOTICATION action when notifyUser function is dispatched', () => {
    const expectedActions = [
      {
        type: types.ADD_NOTIFICATION,
        payload: {
          id: '1',
          type: 'error',
          msg: 'Some message',
        },
      },
    ]

    const store = mockStore({ notifications: [] })
    jest.useFakeTimers()

    store.dispatch(thunks.notifyUser('Some message', 'error'))

    expect(store.getActions()).toMatchObject([
      {
        ...expectedActions[0],
        payload: {
          ...expectedActions[0].payload,
          id: expect.any(String),
        },
      },
    ])
  })
})
