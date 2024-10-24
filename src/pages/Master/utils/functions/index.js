export { campaignAttributes } from 'pages/Home/components/Campaigns/utils/functions'

export const colorConditions = (condition = 0) => {
	return condition ? (condition > 0 ? 'error' : 'success') : 'black'
}
