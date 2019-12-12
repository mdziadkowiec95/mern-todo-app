import { notificationsReducer } from '../reducers'
import { addNotification, removeNotification } from '../actions'

const exampleNotification = {
  id: '123',
  type: 'success',
  msg: 'You did it!',
}

describe('notificationsReducer', () => {
  it('should return the initial state', () => {
    expect(notificationsReducer(undefined, [])).toEqual([])
  })

  it('should handle ADD_NOTIFICATION properly', () => {
    expect(notificationsReducer([], addNotification('123', 'success', 'You did it!'))).toEqual([
      exampleNotification,
    ])
  })

  it('should handle REMOVE_NOTIFICATION properly', () => {
    expect(notificationsReducer([exampleNotification], removeNotification('123'))).toEqual([])
  })
})
