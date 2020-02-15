export const isDevelopmentMode = () => process.env.NODE_ENV === 'development'

export const replaceToServerPort = path =>
  isDevelopmentMode ? path.replace('localhost:3000', 'localhost:5000') : path
