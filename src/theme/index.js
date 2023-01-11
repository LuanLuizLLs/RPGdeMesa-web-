/** Colors palette of theme  */
const theme = {
  primary: '#997C52',
  secondary: '#F5DEB3',
  success: '#1E9B1E',
  error: '#D12C2C',
  warning: '#BDAC19',
  info: '#3A3A8F',
  black: '#514E60',
  gray: '#76767E',
  white: '#EBEFD4',
}

/** Colors contrast  */
export const contrast = (color) => {
  return [
    'secondary',
    'white',
  ].includes(color) ? theme.black : theme.white
}

export default theme