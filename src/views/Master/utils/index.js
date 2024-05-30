export { campaignAttributes } from 'views/Home/container/Campaigns/utils'

export const colorConditions = (condition = 0) => {
	return condition ? (condition > 0 ? 'error' : 'success') : 'black'
}
