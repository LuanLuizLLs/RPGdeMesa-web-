import { useState } from 'react'
import { campaignStore, sceneryStore } from 'pages/Master/utils/store'
import { sceneryAttributes } from '../utils/functions'
import { INITIAL } from '../utils/constants'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useStore from 'hooks/useStore'
import useSse from 'hooks/useSse'
import API from 'services/api'

export function useScenarios() {
	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const CAMPAIGN = useStore(campaignStore)

	const [list, setList] = useState(INITIAL.LIST)
	const [modal, setModal] = useState(INITIAL.MODAL)
	const [values, setValues] = useState(INITIAL.VALUES)
	const [collapse, setCollapse] = useState(INITIAL.COLLAPSE)

	const handle = {
		openSecenery(content, data = {}) {
			setModal({ content, data })
			setValues({ ...values, ...data })
		},
		collapseSecenery(name) {
			setCollapse({
				[name]: !collapse[name]
			})
		},
		resetSecenery() {
			setModal(INITIAL.MODAL)
			setValues(INITIAL.VALUES)
		},
		generateSecenery() {
			setValues({
				...values,
				...sceneryAttributes(),
			})
		},
		initSecenery() {
			API('scenarios', {
				id: CAMPAIGN.id_scenery,
				id_campaign: CAMPAIGN.id,
			})
				.read(({ data }) => {
					const [scenery] = data.response
					sceneryStore.set(scenery)
				})
				.finally(stopLoading)
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
				.finally(stopLoading)
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
				.then(handle.resetSecenery)
				.then(handle.listSecenery)
				.catch(stopLoading)
		},
		deleteScenery() {
			startLoading('circular')

			API('scenarios', values)
				.delete(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetSecenery)
				.then(handle.listSecenery)
				.catch(stopLoading)
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
				.then(handle.resetSecenery)
				.catch(stopLoading)
		},
		updateScenery() {
			startLoading('circular')

			API('scenarios', values)
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetSecenery)
				.then(handle.listSecenery)
				.catch(stopLoading)
		},
	}

	useSse('master',() => {
		handle.listSecenery()
		handle.initSecenery()
	}, [CAMPAIGN.id_scenery], Boolean(CAMPAIGN.id))

	return {
		list,
		handle,
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
		stateCollapse: [collapse, setCollapse],
	}
}