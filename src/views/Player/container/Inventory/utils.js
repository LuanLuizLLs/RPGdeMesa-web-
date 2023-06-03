import { ATTRIBUTE } from '../../../../configs'

export const optionsUsable = (usable = false) => {
	return usable ? Object.keys(ATTRIBUTE.SECONDARY) : Object.keys(ATTRIBUTE.PRIMARY)
}

export const itemInfos = (character = {}, item = {}) => {
	const {
		icon,
		modifier,
		damage,
	} = {
		icon: ATTRIBUTE.ICONS[item.attribute],
		modifier: character[ATTRIBUTE.PRIMARY[item.attribute]],
		damage: item.level,
	}
	return `${icon} ${modifier} | 🩸 ${damage}`
}
