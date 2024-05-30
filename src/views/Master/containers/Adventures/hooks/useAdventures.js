import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { optionRandow } from 'utils'
import { CAMPAIGNS } from 'constants'
import { INITIAL } from '../constants'
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
				name: optionRandow(CAMPAIGNS.ADVENTURES),
			})
		},
		listAdventure() {
			API('adventures', {
				id_campaign: CAMPAIGN.id,
			})
				.read(({ data }) => {
					const adventureStarted = data.response.find(({ id }) => (id === CAMPAIGN.id_adventure))
					setList((state) => ({
						...state, rows: data.response,
					}))
					setDispatch({
						type: 'ADVENTURE',
						data: adventureStarted || {},
					})
				})
		},
		createAdventure() {
			startLoading('bar')

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
			startLoading('bar')

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
			startLoading('bar')

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
			startLoading('bar')

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
	}, [CAMPAIGN.id])

	return {
		list,
		handle,
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
		stateCollapse: [collapse, setCollapse],
	}
}