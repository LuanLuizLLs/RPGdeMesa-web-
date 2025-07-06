import { OPTIONS } from 'utils/constants'

export const optionsActive = (active = false) => {
	return active ? OPTIONS.ATTRIBUTE.PRIMARY : OPTIONS.ATTRIBUTE.SECONDARY
}
