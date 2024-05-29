import { addSignal } from 'utils'

export const pointAttribute = (modifier = 0, damage = 0) => {
	const point = {
		modifier: Number(modifier),
		damage: Math.floor((Number(modifier) + Number(damage)) / 2),
	}
	return `1d20${point.modifier ? addSignal(point.modifier) : ''} | 1d6${point.damage ? addSignal(point.damage) : ''}`
}