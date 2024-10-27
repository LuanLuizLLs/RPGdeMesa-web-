import { ADVENTURE } from 'utils/constants'
import { optionRandow } from 'utils/functions'

export function adventureAttributes() {
	return {
		goal: optionRandow(ADVENTURE.GOAL),
		reward: optionRandow(ADVENTURE.REWARD),
	}
}