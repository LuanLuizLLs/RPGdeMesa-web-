import { useState } from 'react'
import { campaignStore, adventureStore } from 'pages/Master/utils/store'
import { adventureAttributes } from '../utils/functions'
import { INITIAL } from '../utils/constants'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useStore from 'hooks/useStore'
import useSse from 'hooks/useSse'
import API from 'services/api'

export function useAdventures() {
	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const CAMPAIGN = useStore(campaignStore)

	const [list, setList] = useState(INITIAL.LIST)
	const [modal, setModal] = useState(INITIAL.MODAL)
	const [values, setValues] = useState(INITIAL.VALUES)
	const [collapse, setCollapse] = useState(INITIAL.COLLAPSE)

	const handle = {
		openAdventure(content, data = {}) {
			setModal({ content, data })
			setValues({ ...values, ...data })
		},
		collapseAdventure(name) {
			setCollapse({
				[name]: !collapse[name],
			})
		},
		resetAdventure() {
			setModal(INITIAL.MODAL)
			setValues(INITIAL.VALUES)
		},
		generateAdventure() {
			setValues({
				...values,
				...adventureAttributes(),
			})
		},
		initAdventure() {
			API('adventures', {
				id: CAMPAIGN.id_adventure,
				id_campaign: CAMPAIGN.id,
			})
				.read(({ data }) => {
					const [adventure] = data.response
					adventureStore.set(adventure)
				})
				.finally(stopLoading)
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
				.finally(stopLoading)
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
				.then(handle.resetAdventure)
				.then(handle.listAdventure)
				.catch(stopLoading)
		},
		deleteAdventure() {
			startLoading('circular')

			API('adventures', values)
				.delete(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetAdventure)
				.then(handle.listAdventure)
				.catch(stopLoading)
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
				.then(handle.resetAdventure)
				.catch(stopLoading)
		},
		updateAdventure() {
			startLoading('circular')

			API('adventures', values)
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetAdventure)
				.then(handle.listAdventure)
				.catch(stopLoading)
		},
	}

	useSse('master', () => {
		handle.initAdventure()
		handle.listAdventure()
	}, [CAMPAIGN.id_adventure], Boolean(CAMPAIGN.id))

	return {
		list,
		handle,
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
		stateCollapse: [collapse, setCollapse],
	}
}