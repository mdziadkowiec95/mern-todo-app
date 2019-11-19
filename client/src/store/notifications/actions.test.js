import * as actions from './actions'
import { types } from './types'

describe('notification actions', () => {
  it('should create an action to add a notification', () => {
    const id = '1'
    const type = 'error'
    const msg = 'Some message'

    const expectedAction = {
      type: types.ADD_NOTIFICATION,
      payload: {
        id,
        type,
        msg,
      },
    }
    expect(actions.addNotification(id, type, msg)).toEqual(expectedAction)
  })

  it('should create an action to remove a notification', () => {
    const id = '1'

    const expectedAction = {
      type: types.REMOVE_NOTIFICATION,
      payload: {
        id,
      },
    }
    expect(actions.removeNotification(id)).toEqual(expectedAction)
  })
})
