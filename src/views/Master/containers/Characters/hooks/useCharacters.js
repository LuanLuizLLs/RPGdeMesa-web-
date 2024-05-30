import { useState } from 'react'
import { useSelector } from 'react-redux'
import { INITIAL } from '../constants'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useSse from 'hooks/useSse'
import API from 'services/api'

export function useCharacters() {
	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const [list, setList] = useState(INITIAL.LIST)
	const [modal, setModal] = useState(INITIAL.MODAL)
	const [values, setValues] = useState(INITIAL.VALUES)

	const { CAMPAIGN } = useSelector(({ reducer }) => reducer)

	const handle = {
		openModal(content, data = {}) {
			setModal({ content, data })
			setValues({ ...values, ...data })
		},
		clearValues() {
			setValues(INITIAL.VALUES)
		},
		resetCharacter() {
			setValues(INITIAL.VALUES)
			setModal(INITIAL.MODAL)
			stopLoading()
		},
		listCharacter() {
			API('characters', {
				id_campaign: CAMPAIGN.id
			})
				.read(({ data }) => {
					setList(Object.assign({ ...INITIAL.LIST }, data.response))
				})
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
			startLoading('bar')

			API('characters', {
				...values,
				id_campaign: CAMPAIGN.id,
			})
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetCharacter)
		},
		removeCharacter() {
			startLoading('bar')

			API('characters', {
				...values,
				id_campaign: null,
			})
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetCharacter)
		},
		updateCharacter(index) {
			startLoading('bar')

			API('characters', list[index])
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetCharacter)
		},
	}
  
	useSse('player', () => {
		if (CAMPAIGN.id) {
			handle.listCharacter()
		}
	}, [CAMPAIGN.id])

	return {
		list,
		handle,
		stateList: [list, setList],
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
	}
}