import { BREAKPOINT, ATTRIBUTE } from '../configs'

/** Which device current */
export const whichDevice = (device = '') => {
  let devices = {}
  Object.entries(BREAKPOINT).forEach(([key, value]) => {
    devices = {
      ...devices, [key]: (window.innerWidth <= value)
    }
  })
  return devices[device]
}

/** Checks if values are null */
export const isNull = (values = {}, optionals = []) => {
  const nulls = []
  Object.entries(values).forEach(([key, value]) => {
    (!value && !optionals.includes(key)) && nulls.push(key)
  })
  return nulls.length > 0 && nulls
}

/** Separate data according to initials */
export const separateData = (initial = {}, current = {}) => {
  const separate = {}
  Object.keys(initial).forEach((key) => {
    separate[key] = current[key]
  })
  return separate
}

/** Draw one of the options */
export const optionRandow = (options = []) => {
  return options[Math.floor(Math.random() * options.length)]
}

/** Draw between a minimum and maximum number */
export const numberRandow = (min = 0, max = 0) => {
  if (min < 0) {
    return parseInt((Math.random() * (min - 1))) + parseInt((Math.random() * (max + 1)))
  }
  return parseInt((Math.random() * ((max + 1) - min)) + min)
}

/** Maximum life capacity  */
export const maxLife = (character = {}) => {
  let life = 0
  Object.entries(character).forEach(([key, value]) => {
    if (Object.values(ATTRIBUTE.PRIMARY).includes(key)) {
      life += value
    }
  })
  return life
}