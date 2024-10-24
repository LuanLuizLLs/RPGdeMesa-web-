import { OPTIONS } from 'utils/configs'

export const optionsUsable = (usable = false) => {
	return usable ? OPTIONS.ATTRIBUTE.SECONDARY : OPTIONS.ATTRIBUTE.PRIMARY
}
