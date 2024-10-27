import { useState } from 'react'
import { campaignStore } from 'pages/Master/utils/store'
import { INITIAL } from '../utils/constants'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useStore from 'hooks/useStore'
import useSse from 'hooks/useSse'
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
		searchCharacter() {
			startLoading('bar')

			API('characters', values)
				.read(({ data }) => {
					const [character = {}] = data.response
					setValues({
						...values,
						...character,
					})
					openMessage(data.status, data.message)
				})
				.finally(stopLoading)
		},
		addCharacter() {
			startLoading('circular')

			API('characters', {
				...values,
				id_campaign: CAMPAIGN.id,
			})
				.update(({ data }) => {
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
  
	useSse('player', () => {
		handle.listCharacter()
	}, [CAMPAIGN.id], Boolean(CAMPAIGN.id))

	return {
		list,
		handle,
		stateList: [list, setList],
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
	}
}