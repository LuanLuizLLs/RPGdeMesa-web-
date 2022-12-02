/**
 * Compare password equality
 * @param {String} first 
 * @param {String} secound 
 * @returns 
 */
export const comparativePassword = (first = '', secound = '') => {
  return {
    valid: (first === secound),
    validate: Boolean(secound) ? (first === secound) ? 'valid' : 'invalid' : 'default',
  }
}