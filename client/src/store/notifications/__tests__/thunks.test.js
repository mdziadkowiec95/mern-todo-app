import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as thunks from '../thunks'
import { types } from '../types'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('(Redux) - notifications - thunks', () => {
  it('generates uuid indetifier when notifyUser function is dispatched', () => {
    const store = mockStore({ notifications: [] })
    store.dispatch(thunks.notifyUser('Some message', 'error'))
    const [addedAction] = store.getActions()

    expect(addedAction.payload.id).toBeDefined()
    expect(typeof addedAction.payload.id).toBe('string')
    expect(addedAction.payload.id.length).toBeGreaterThan(0)
  })

  it('creates new notification when notifyUser function is dispatched', () => {
    const expectedActions = [
      {
        type: types.ADD_NOTIFICATION,
        payload: {
          id: '123',
          type: 'error',
          msg: 'Some message',
        },
      },
    ]

    const store = mockStore({ notifications: [] })
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

  it('removes notification after timeout notifyUser function is dispatched', () => {
    const expectedActions = [
      {
        type: types.ADD_NOTIFICATION,
        payload: {
          id: '123',
          type: 'error',
          msg: 'Some message',
        },
      },
      {
        type: types.REMOVE_NOTIFICATION,
        payload: { id: '123' },
      },
    ]

    const store = mockStore({ notifications: [] })

    store.dispatch(thunks.notifyUser('123', 'Some message', 'error', 0))

    setTimeout(() => {
      expect(store.getActions()).toMatchObject(
        expectedActions.map(action => ({
          ...action,
          payload: {
            id: expect.any(String),
          },
        })),
      )
    }, 0)
  })
})
