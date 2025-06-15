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

export const modifierPoints = (character = {}, item = {}) => {
	const {
		icon,
		modifier,
		level,
	} = {
		icon: ATTRIBUTE.ICONS[item.attribute],
		modifier: character[ATTRIBUTE.PRIMARY[item.attribute]],
		level: item.level,
	}

	const rank = ATTRIBUTE.RANK[modifier - level]

	if (rank) {
		return `${icon} ${rank} ${ATTRIBUTE.ICONS.DAD}+${level}`
	}

	return `${icon} ⨉ ${ATTRIBUTE.ICONS.DAD}-${level}`
}
