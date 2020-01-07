import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button from './Button'

// isSubmit = false,
//   block,
//   blockMobile,
//   primary,
//   secondary,
//   tertiary,
//   disabled,
//   accent,
//   asRouterLink,
//   asLink,
//   goTo,
//   title,
//   onClickFn,
//   children,

const placeholderChildText = 'Button'

describe('Button component', () => {
  it('should render properly', () => {
    const component = render(<Button>Children text</Button>)
    expect(component).toBeTruthy()
  })

  it('should render children prop properly', () => {
    const text = 'Children text'
    const { getByText } = render(<Button>{text}</Button>)
    const btn = getByText(text)
    expect(btn.textContent).toEqual(text)
  })

  it('should render as proper link when "asLink" and "goTo" props are provided', () => {
    const { getByText } = render(
      <Button asRouterLink goTo="/url">
        {placeholderChildText}
      </Button>,
    )
    const btn = getByText(placeholderChildText)
    expect(btn.tagName).toEqual('A')
    expect(btn.href).toBeTruthy()
    expect(btn.rel).toEqual('noopener noreferrer')
  })

  it('should render as proper link when "asLink" and "goTo" props are provided', () => {
    const { getByText } = render(
      <Button asLink goTo="/url">
        {placeholderChildText}
      </Button>,
    )
    const btn = getByText(placeholderChildText)
    expect(btn.tagName).toEqual('A')
    expect(btn.href).toBeTruthy()
    expect(btn.rel).toEqual('noopener noreferrer')
  })

  //   it('should run onClick function properly', () => {
  //     const onClickFn = jest.fn()
  //     const component = render(<BurgerButton onClick={onClickFn} />)
  //     const btn = component.getByTestId('burger-btn')
  //     fireEvent.click(btn)
  //     expect(onClickFn).toBeCalledTimes(1)
  //   })
})
