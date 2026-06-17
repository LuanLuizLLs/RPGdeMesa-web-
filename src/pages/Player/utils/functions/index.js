import { addSignal } from 'utils/functions'
import { ATTRIBUTE } from 'utils/constants'

export function featureAttributes(item = {}) {
	return Object.entries(ATTRIBUTE.PRIMARY).reduce((acc, [key, value]) => {
		const attribute = item[value]

		if (attribute) {
			return `${acc}${ATTRIBUTE.ICONS[key]}${addSignal(attribute)} `
		}

		return acc
	}, '')
}

export const modifierPoints = (character = {}, item = {}, attribute = 'PRIMARY') => {
	const {
		icon,
		modifier,
		level,
	} = {
		icon: ATTRIBUTE.ICONS[item.attribute],
		modifier: character[ATTRIBUTE[attribute][item.attribute]],
		level: item.level,
	}

	if (level > modifier) {
		return `${icon} ${modifier} ${ATTRIBUTE.ICONS.DAD}${addSignal(modifier - level) || ''}`
	}

	return `${icon} ${modifier} ${ATTRIBUTE.ICONS.DAD}${addSignal(level) || ''}`
}
