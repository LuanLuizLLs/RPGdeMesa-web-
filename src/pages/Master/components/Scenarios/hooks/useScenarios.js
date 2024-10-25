import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { INITIAL } from '../utils/constants'
import { optionRandow } from 'utils/functions'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useSse from 'hooks/useSse'
import API from 'services/api'

export function useScenarios() {
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
				...collapse, [name]: !collapse[name]
			})
		},
		resetValues() {
			setModal(INITIAL.MODAL)
			setValues(INITIAL.VALUES)
			stopLoading()
		},
		generateSecenery() {
			setValues({
				...values,
				name: optionRandow([1, 2, 3]),
			})
		},
		initSecenery() {
			API('scenarios', {
				id: CAMPAIGN.id_scenery,
				id_campaign: CAMPAIGN.id,
			})
				.read(({ data }) => {
					const [scenery] = data.response
					setDispatch({
						type: 'SCENERY',
						data: scenery || {},
					})
				})
		},
		listSecenery() {
			API('scenarios', {
				id_campaign: CAMPAIGN.id,
			})
				.read(({ data }) => {
					setList((state) => ({
						...state, rows: data.response,
					}))
				})
		},
		createScenery() {
			startLoading('circular')

			API('scenarios', {
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
		deleteScenery() {
			startLoading('circular')

			API('scenarios', values)
				.delete(({ data }) => {
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetValues)
		},
		startScenery() {
			startLoading('circular')

			API('campaigns', {
				...CAMPAIGN,
				id_scenery: values.id,
			})
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetValues)
		},
		updateScenery() {
			startLoading('circular')

			API('scenarios', values)
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetValues)
		},
	}

	useSse('master',() => {
		if (CAMPAIGN.id) {
			handle.listSecenery()
		}
		if (CAMPAIGN.id_scenery) {
			handle.initSecenery()
		}
	}, [CAMPAIGN.id, CAMPAIGN.id_scenery])

	return {
		list,
		handle,
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
		stateCollapse: [collapse, setCollapse],
	}
}