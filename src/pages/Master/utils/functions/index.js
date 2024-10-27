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
		return `Difícil d20${addSignal(condition) || ''}`
	}

	if (condition < EASY) {
		return `Fácil d20${addSignal(condition) || ''}`
	}

	return `Médio d20${addSignal(condition) || ''}` 
}
