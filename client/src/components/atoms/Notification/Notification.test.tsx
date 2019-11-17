import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './Notification';
import { render } from '@testing-library/react';

it('displays notification data properly', () => {
  const fakeNotification = {
    id: '1',
    type: 'success',
    msg: 'Cool msg...',
  };

  const { getByTestId } = render(<Notification {...fakeNotification} />);

  const wrapper = getByTestId('notification-wrap');

  expect(wrapper.id).toBe(fakeNotification.id);
  expect(wrapper.className).toMatch(fakeNotification.type);
  expect(wrapper.textContent).toBe(fakeNotification.msg);
});
