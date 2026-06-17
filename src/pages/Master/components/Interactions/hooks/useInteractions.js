import { useEffect, useState } from 'react'
import { adventureStore } from 'pages/Master/utils/store'
import { INITIAL } from '../utils/constants'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useStore from 'hooks/useStore'
import API from 'services/api'

export function useInteractions() {
	const ADVENTURE = useStore(adventureStore)

	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const [list, setList] = useState(INITIAL.LIST)
	const [modal, setModal] = useState(INITIAL.MODAL)
	const [values, setValues] = useState(INITIAL.VALUES)

	const handle = {
		openInteraction(content, data = modal.data) {
			setModal({ content, data })
			setValues({ ...values, ...data })
		},
		resetInteraction() {
			setModal(INITIAL.MODAL)
			setValues(INITIAL.VALUES)
		},
		listInteraction() {
			startLoading('bar')

			API('interactions', {
				id_adventure: ADVENTURE.id,
			})
				.read(({ data }) => {
					setList((state) => ({
						...state,
						rows: data.response,
					}))
				})
				.finally(stopLoading)
		},
		createInteraction() {
			startLoading('circular')

			API('interactions', {
				...values,
				id_adventure: ADVENTURE.id,
			})
				.create(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetInteraction)
				.then(handle.listInteraction)
				.catch(stopLoading)
		},
		updateInteraction() {
			startLoading('circular')

			API('interactions', values)
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetInteraction)
				.then(handle.listInteraction)
				.catch(stopLoading)
		},
		deleteInteraction() {
			startLoading('circular')

			API('interactions', values)
				.delete(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetInteraction)
				.then(handle.listInteraction)
				.catch(stopLoading)
		},
		startInteraction() {
			startLoading('circular')

			const { id: id_interaction, ...rest } = values

			API('interactions-board', {
				id_interaction,
				...rest
			})
				.create(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetInteraction)
				.catch(stopLoading)
		}
	}

	useEffect(() => {
		if (ADVENTURE.id) {
			handle.listInteraction()
		}
	}, [ADVENTURE.id])

	return {
		list,
		handle,
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
	}
}