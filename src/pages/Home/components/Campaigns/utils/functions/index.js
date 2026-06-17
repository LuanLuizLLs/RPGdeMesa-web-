import { CONDITIONS } from 'utils/constants'
import { numberRandow } from 'utils/functions'

export const campaignAttributes = (period = '', climate = '') => {
	try {
		const [min, max] = CONDITIONS[period][climate]
  
		return {
			ground: numberRandow(min, max),
			resources: numberRandow(min, max),
		}
	} catch {
		return {}
	}
}