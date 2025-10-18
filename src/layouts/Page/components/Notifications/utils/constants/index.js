import { NOTIFICATION_TYPE } from 'utils/enums'

export const INITIAL = {
	LIST: [],
	MODAL: {
		content: '',
		data: {}
	},
	VALUES: {
		id: null,
		domain: null,
		action: null,
		data: {}
	}
}

export const TEXT = {
	[NOTIFICATION_TYPE.INVITE_CAMPAIGN]: 'Você recebeu um convite para entrar em uma campanha.'
}