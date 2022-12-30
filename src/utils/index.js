import { BREAKPOINT, ATTRIBUTE } from '../configs'
import { RANK } from '../constants'

/**
 * Which device current
 * @param {String} device
 * @returns 
 */
export const whichDevice = (device = '') => {
  let devices = {}
  Object.entries(BREAKPOINT).forEach(([key, value]) => {
    devices = {
      ...devices, [key]: (window.innerWidth <= value)
    }
  })
  return devices[device]
}

/**
 * Checks if values are null
 * @param {Object} values 
 * @param {Array} optionals
 * @returns 
 */
export const isNull = (values = {}, optionals = []) => {
  const nulls = []
  Object.entries(values).forEach(([key, value]) => {
    (!value && !optionals.includes(key)) && nulls.push(key)
  })
  return nulls.length > 0 && nulls
}

/**
 * Separate data according to initials
 * @param {Object} initial 
 * @param {Object} current 
 * @returns 
 */
export const separateData = (initial = {}, current = {}) => {
  const separate = {}
  Object.keys(initial).forEach((key) => {
    separate[key] = current[key]
  })
  return separate
}

/**
 * Draw one of the options
 * @param {Array} options 
 * @returns 
 */
export const optionRandow = (options = []) => {
  return options[Math.floor(Math.random() * options.length)]
}

/**
 * Draw between a minimum and maximum number 
 * @param {Number} min 
 * @param {Number} max 
 * @returns 
 */
export const numberRandow = (min = 0, max = 0) => {
  if (min < 0) {
    return parseInt((Math.random() * (min - 1))) + parseInt((Math.random() * (max + 1)))
  }
  return parseInt((Math.random() * ((max + 1) - min)) + min)
}

/**
 * Maximum life capacity
 * @param {Object} character 
 * @param {Number} capacity 
 * @returns 
 */
export const maxLife = (character = {}, capacity = 0) => {
  Object.entries(character).forEach(([key, value]) => {
    if (Object.values(ATTRIBUTE.PRIMARY).includes(key)) {
      capacity += value
    }
  })
  return capacity
}

/**
 * Maximum mental capacity 
 * @param {Object} character 
 * @param {Number} capacity 
 * @returns 
 */
export const mentalCapacity = (character = {}, capacity = 0) => {
  Object.entries(character).forEach(([key, value]) => {
    if (ATTRIBUTE.MENTAL.includes(key)) {
      capacity += value
    }
  })
  return capacity
}

/**
 * Maximum phisical capacity
 * @param {Object} character 
 * @param {Number} capacity 
 * @returns 
 */
export const phisicalCapacity = (character = {}, capacity = 0) => {
  Object.entries(character).forEach(([key, value]) => {
    if (ATTRIBUTE.PHISICAL.includes(key)) {
      capacity += value
    }
  })
  return capacity
}

/**
 * Add arithmetic sign
 * @param {Number} number 
 * @returns 
 */
export const addSignal = (number = 0) => {
  if (number > 0) {
    return `+${number}`
  }
  return number
}

/**
 * Point attributes
 * @param {String} attribute 
 * @param {Number} modifier
 * @param {Number} level
 * @returns 
 */
export const pointAttribute = (attribute = '', modifier = 0, level = 0) => {
  const format = {
    attribute,
    damage: level ? addSignal(level) : '',
    modifier: modifier ? addSignal(modifier) : '',
  }
  return `${format.attribute} 1d20${format.modifier} 1d6${format.damage}`
}

/**
 * Modifier information
 * @param {Object} character 
 * @param {Object} item 
 * @returns 
 */
export const modifierPoints = (character = {}, item = {}) => {
  const {
    icon,
    modifier,
    damage,
  } = {
    icon: ATTRIBUTE.ICONS[item.attribute],
    modifier: character[ATTRIBUTE.PRIMARY[item.attribute]],
    damage: item.level,
  }
  return `${icon} ${RANK[modifier - damage] || 'X'} ${ATTRIBUTE.ICONS.DAN} ${damage}`
}

/**
 * Scroll points
 * @param {Number} modifier
 * @param {Number} level
 * @returns 
 */
export const scrollPoints = (attribute = 0, level = 0) => {
  const {
    modifier,
    damage,
  } = {
    modifier: attribute >= level ? attribute : attribute - level,
    damage: attribute >= level ? level : level - (level - attribute),
  }
  return `1d20${modifier ? addSignal(modifier) : ''} | 1d6${damage ? addSignal(damage) : ''}`
}