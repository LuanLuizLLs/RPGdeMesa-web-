import { CONDITIONS } from '../configs'
import { numberRandow } from '../utils'

const useCampaign = () => {
  const additionalAttributes = (period = '', climate = '') => {
    const [min, max] = CONDITIONS[period][climate]
    return {
      ground: numberRandow(min, max),
      resources: numberRandow(min, max),
    }
  }

  return {
    additionalAttributes,
  }
}

export default useCampaign