import { CONDITIONS } from 'utils/configs'
import { numberRandow } from 'utils/functions'

export const campaignAttributes = (period = '', climate = '') => {
	const [min, max] = CONDITIONS[period][climate]
	return {
		ground: numberRandow(min, max),
		resources: numberRandow(min, max),
	}
}