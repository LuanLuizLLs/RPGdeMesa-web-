import { ATTRIBUTE } from '../../../../configs'

/**
 * Define options based on usability
 * @param {Boolean} usable 
 * @returns 
 */
export const optionsUsable = (usable = false) => {
  return usable ? Object.keys(ATTRIBUTE.SECONDARY) : Object.keys(ATTRIBUTE.PRIMARY)
}

/**
 * Displays item information
 * @param {Object} character 
 * @param {Object} item 
 * @returns 
 */
export const itemInfos = (character = {}, item = {}) => {
  const {
    icon,
    modifier,
    damage,
  } = {
    icon: ATTRIBUTE.ICONS[item.attribute],
    modifier: character[ATTRIBUTE.PRIMARY[item.attribute]],
    damage: item.level,
  }
  return `${icon} ${modifier} | 🩸 ${damage}`
}
