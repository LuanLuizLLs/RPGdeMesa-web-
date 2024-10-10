import { ATTRIBUTE } from 'configs'

export const optionsUsable = (usable = false) => {
	return usable ? Object.keys(ATTRIBUTE.SECONDARY) : Object.keys(ATTRIBUTE.PRIMARY)
}
