import { CONDITIONS } from '../../../../../configs'
import { numberRandow } from '../../../../../utils'

const campaignAttributes = (period = '', climate = '') => {
	const [min, max] = CONDITIONS[period][climate]
	return {
		ground: numberRandow(min, max),
		resources: numberRandow(min, max),
	}
}

export {
	campaignAttributes,
}