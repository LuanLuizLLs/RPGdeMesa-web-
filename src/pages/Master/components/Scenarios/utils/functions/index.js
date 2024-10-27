import { SCENERY } from 'utils/constants'
import { optionRandow } from 'utils/functions'

export function sceneryAttributes() {
	return {
		region: optionRandow(SCENERY.REGION),
		culture: optionRandow(SCENERY.CULTURE),
	}
}