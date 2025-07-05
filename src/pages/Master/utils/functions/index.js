import { ATTRIBUTE } from 'utils/constants'
import { addSignal } from 'utils/functions'

export { campaignAttributes } from 'pages/Home/components/Campaigns/utils/functions'

const EASY = -2
const HARD = 2

export const colorConditions = (condition = 0) => {
	if (condition > HARD) {
		return 'error'
	}

	if (condition < EASY) {
		return 'success'
	}

	return 'black'
}

export const difficultyLabel = (condition = 0) => {
	if (condition > HARD) {
		return `Difícil ${ATTRIBUTE.ICONS.DAD}${addSignal(condition) || ''}`
	}

	if (condition < EASY) {
		return `Fácil ${ATTRIBUTE.ICONS.DAD}${addSignal(condition) || ''}`
	}

	return `Médio ${ATTRIBUTE.ICONS.DAD}${addSignal(condition) || ''}` 
}
