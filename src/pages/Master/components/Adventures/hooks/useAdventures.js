import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { optionRandow } from 'utils/functions'
import { INITIAL } from '../utils/constants'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useSse from 'hooks/useSse'
import API from 'services/api'

export function useAdventures() {
	const setDispatch = useDispatch()

	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const { CAMPAIGN } = useSelector(({ reducer }) => reducer)

	const [list, setList] = useState(INITIAL.LIST)
	const [modal, setModal] = useState(INITIAL.MODAL)
	const [values, setValues] = useState(INITIAL.VALUES)
	const [collapse, setCollapse] = useState(INITIAL.COLLAPSE)

	const handle = {
		openModal(content, data = {}) {
			setModal({ content, data })
			setValues({ ...values, ...data })
		},
		openCollapse(name) {
			setCollapse({
				...collapse,
				[name]: !collapse[name],
			})
		},
		resetValues() {
			setModal(INITIAL.MODAL)
			setValues(INITIAL.VALUES)
			stopLoading()
		},
		generateAdventure() {
			setValues({
				...values,
				name: optionRandow([1, 2, 3]),
			})
		},
		initAdventure() {
			API('adventures', {
				id: CAMPAIGN.id_adventure,
				id_campaign: CAMPAIGN.id,
			})
				.read(({ data }) => {
					const [adventure] = data.response
					setDispatch({
						type: 'ADVENTURE',
						data: adventure || {},
					})
				})
		},
		listAdventure() {
			API('adventures', {
				id_campaign: CAMPAIGN.id,
			})
				.read(({ data }) => {
					setList((state) => ({
						...state, rows: data.response,
					}))
				})
		},
		createAdventure() {
			startLoading('circular')

			API('adventures', {
				...values,
				id_campaign: CAMPAIGN.id,
			})
				.create(({ data }) => {
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetValues)
		},
		deleteAdventure() {
			startLoading('circular')

			API('adventures', values)
				.delete(({ data }) => {
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetValues)
		},
		startAdventure() {
			startLoading('circular')

			API('campaigns', {
				...CAMPAIGN,
				id_adventure: values.id,
			})
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetValues)
		},
		updateAdventure() {
			startLoading('circular')

			API('adventures', values)
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetValues)
		},
	}

	useSse('master', () => {
		if (CAMPAIGN.id) {
			handle.listAdventure()
		}
		if (CAMPAIGN.id_adventure) {
			handle.initAdventure()
		}
	}, [CAMPAIGN.id, CAMPAIGN.id_adventure])

	return {
		list,
		handle,
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
		stateCollapse: [collapse, setCollapse],
	}
}