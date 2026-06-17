import { useState } from 'react'
import { campaignStore } from 'pages/Master/utils/store'
import { INITIAL } from '../utils/constants'
import { NOTIFICATION_TYPE } from 'utils/enums'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useStore from 'hooks/useStore'
import usePusher from 'hooks/usePusher'
import API from 'services/api'

export function useCharacters() {
	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const [list, setList] = useState(INITIAL.LIST)
	const [modal, setModal] = useState(INITIAL.MODAL)
	const [values, setValues] = useState(INITIAL.VALUES)

	const CAMPAIGN = useStore(campaignStore)

	const handle = {
		openAdventure(content, data = {}) {
			setModal({ content, data })
			setValues({ ...values, ...data })
		},
		clearValues() {
			setValues(INITIAL.VALUES)
		},
		resetCharacter() {
			setValues(INITIAL.VALUES)
			setModal(INITIAL.MODAL)
		},
		listCharacter() {
			API('characters', {
				id_campaign: CAMPAIGN.id
			})
				.read(({ data }) => {
					setList(Object.assign({ ...INITIAL.LIST }, data.response))
				})
				.finally(stopLoading)
		},
		addCharacter() {
			startLoading('circular')

			API('notifications', {
				...values,
				id_campaign: CAMPAIGN.id,
				name_campaign: CAMPAIGN.name,
				type: NOTIFICATION_TYPE.INVITE_CAMPAIGN,
			})
				.create(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetCharacter)
				.then(handle.listCharacter)
				.catch(stopLoading)
		},
		removeCharacter() {
			startLoading('circular')

			API('characters', {
				...values,
				id_campaign: null,
			})
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetCharacter)
				.then(handle.listCharacter)
				.catch(stopLoading)
		},
		updateCharacter(index) {
			startLoading('bar')

			API('characters', list[index])
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.listCharacter)
				.catch(stopLoading)
		},
	}

	usePusher('master', CAMPAIGN.id, () => {
		handle.listCharacter()
	})

	return {
		list,
		handle,
		stateList: [list, setList],
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
	}
}