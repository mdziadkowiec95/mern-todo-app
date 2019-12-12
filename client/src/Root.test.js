import React from 'react'
import ReactDOM from 'react-dom'
import App from './Root'
import { LocalStorageMock } from './__mocks__/localStorage'

it('renders without crashing', () => {
  const div = document.createElement('div')

  global.localStorage = new LocalStorageMock()

  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})
