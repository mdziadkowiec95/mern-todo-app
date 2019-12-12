import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import BurgerButton from './BurgerButton'

describe('BurgerButton component', () => {
  it('should render properly', () => {
    const component = render(<BurgerButton onClick={jest.fn()} />)
    expect(component).toBeTruthy()
  })

  it('should run onClick function properly', () => {
    const onClickFn = jest.fn()
    const component = render(<BurgerButton onClick={onClickFn} />)
    const btn = component.getByTestId('burger-btn')
    fireEvent.click(btn)
    expect(onClickFn).toBeCalledTimes(1)
  })
})
