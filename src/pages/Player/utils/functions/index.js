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

export const scrollingPoints = (attribute = 0, level = 0) => {
	const {
		modifier,
		damage,
	} = {
		modifier: attribute >= level ? attribute : attribute - level,
		damage: attribute >= level ? level : level - (level - attribute),
	}
	return `1d20${modifier ? addSignal(modifier) : ''} | 1d6${damage ? addSignal(damage) : ''}`
}
