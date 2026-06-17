import { ATTRIBUTE } from 'utils/constants'
import { addSignal } from 'utils/functions'

export const pointAttribute = (icon, attribute = 0, modifier = 0) => {
	const point = {
		attribute: Number(attribute),
		modifier: Math.floor((Number(attribute) + Number(modifier)) / 2),
	}
	return `${icon} ${attribute} ${ATTRIBUTE.ICONS.DAD}${addSignal(point.modifier) || ''}`
}