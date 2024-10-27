import { SCENARY } from 'utils/constants'
import { optionRandow } from 'utils/functions'

export function sceneryAttributes() {
	return {
		region: optionRandow(SCENARY.REGION),
		culture: optionRandow(SCENARY.CULTURE),
	}
}