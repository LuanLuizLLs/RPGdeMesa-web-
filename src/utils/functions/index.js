import * as CONFIGS from '../constants'

export const whichDevice = (device = '') => {
	let devices = {}
	Object.entries(CONFIGS.BREAKPOINT).forEach(([key, value]) => {
		devices = {
			...devices, [key]: (window.innerWidth <= value)
		}
	})
	return devices[device]
}

export const isNull = (values = {}, optionals = []) => {
	const nulls = []
	Object.entries(values).forEach(([key, value]) => {
		(!value && !optionals.includes(key)) && nulls.push(key)
	})
	return nulls.length > 0 && nulls
}

export const separateData = (initial = {}, current = {}) => {
	const separate = {}
	Object.keys(initial).forEach((key) => {
		separate[key] = current[key]
	})
	return separate
}

export const optionRandow = (options = []) => {
	return options[Math.floor(Math.random() * options.length)]
}

export const numberRandow = (min = 0, max = 0) => {
	if (min < 0) {
		return parseInt((Math.random() * (min - 1))) + parseInt((Math.random() * (max + 1)))
	}
	return parseInt((Math.random() * ((max + 1) - min)) + min)
}

export const addSignal = (number = 0) => {
	if (number > 0) {
		return `+${number}`
	}
	return number
}