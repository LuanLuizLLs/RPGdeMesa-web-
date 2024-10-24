import { addSignal } from 'utils/functions'
import { ATTRIBUTE } from 'utils/configs'

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
	return `${icon} ${ATTRIBUTE.RANK[modifier - damage] || '⨉'} ${ATTRIBUTE.ICONS.DAN} ${damage}`
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
