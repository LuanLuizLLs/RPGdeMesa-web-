import { ATTRIBUTE } from '../../../../configs'

/**
 * Define options based on usability
 * @param {Boolean} usable 
 * @returns 
 */
export const optionsUsable = (usable = false) => {
  return usable ? Object.keys(ATTRIBUTE.SECONDARY) : Object.keys(ATTRIBUTE.PRIMARY)
}
