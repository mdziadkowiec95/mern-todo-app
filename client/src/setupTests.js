// import 'jest-prop-type-error'

const originalConsoleError = console.error

console.error = message => {
  if (/(Failed prop type)/.test(message)) {
    throw new Error(message)
  }

  originalConsoleError(message)
}
