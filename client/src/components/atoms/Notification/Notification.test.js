import React from 'react'
import Notification from './Notification'
import { fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import uuid from 'uuid'
import {
  notificationsReducer,
  initialState as notificationsIS,
} from '../../../store/notifications/reducers'
import { createRenderWithRedux } from '../../../../__utils__/redux'
import { getFakeNotificaitonObject } from '../../../../__utils__/notifications'

// Create function to which will render component with redux store (reducer passed as argument)
const renderWithRedux = createRenderWithRedux(notificationsReducer)

test('removes notification onClick properly', () => {
  const id = uuid.v4()

  const { getByTestId, store } = renderWithRedux(
    <Notification {...getFakeNotificaitonObject(id)} />,
    {
      initialState: [getFakeNotificaitonObject(id)],
    },
  )

  const notificationEl = getByTestId('notification-wrap')
  fireEvent.click(notificationEl)

  expect(store.getState()).toHaveLength(0)
})

test('renders every type of notification', () => {
  ;['success', 'warning', 'error'].forEach((type, index) => {
    const { getByText } = renderWithRedux(
      <Notification {...getFakeNotificaitonObject(index.toString(), type)} />,
    )

    const notificationEl = getByText(`Msg for ${index}`)

    expect(notificationEl).toBeTruthy()
    expect(notificationEl.className).toMatch(type)
    expect(notificationEl.id).toBe(index.toString())
  })
})

test('display notification data properly', () => {
  const { getByText } = renderWithRedux(
    <Notification {...getFakeNotificaitonObject('1', 'success', 'Display test msg')} />,
  )

  const notificationEl = getByText('Display test msg')

  expect(notificationEl).toBeTruthy()
  expect(notificationEl.id).toBe('1')
  expect(notificationEl.className).toMatch('success')
})
