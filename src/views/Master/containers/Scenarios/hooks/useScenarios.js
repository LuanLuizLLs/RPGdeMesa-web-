import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { INITIAL } from '../constants'
import { CAMPAIGNS } from 'constants'
import { optionRandow } from 'utils'
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
				name: optionRandow(CAMPAIGNS.SCENARIOS),
			})
		},
		listSecenery() {
			API('scenarios', {
				id_campaign: CAMPAIGN.id,
			})
				.read(({ data }) => {
					const scenerySelected = data.response.find(({ id }) => (id === CAMPAIGN.id_scenery))
					setList((state) => ({
						...state, rows: data.response,
					}))
					setDispatch({
						type: 'SCENERY',
						data: scenerySelected || {},
					})
				})
		},
		createScenery() {
			startLoading('bar')

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
			startLoading('bar')

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
			startLoading('bar')

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
			startLoading('bar')

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
		handle.listSecenery()
	}, [CAMPAIGN.id])

	return {
		list,
		handle,
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
		stateCollapse: [collapse, setCollapse],
	}
}