import { OPTIONS } from 'utils/constants'

export const optionsUsable = (usable = false) => {
	return usable ? OPTIONS.ATTRIBUTE.SECONDARY : OPTIONS.ATTRIBUTE.PRIMARY
}
