import { useEffect, useState } from 'react'
import { sceneryStore } from 'pages/Master/utils/store'
import { INITIAL } from '../utils/constants'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useStore from 'hooks/useStore'
import API from 'services/api'

export function useExplorations() {
	const SCENERY = useStore(sceneryStore)

	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const [list, setList] = useState(INITIAL.LIST)
	const [modal, setModal] = useState(INITIAL.MODAL)
	const [values, setValues] = useState(INITIAL.VALUES)

	const handle = {
		openExploration(content, data = modal.data) {
			setModal({ content, data })
			setValues({ ...values, ...data })
		},
		resetExploration() {
			setModal(INITIAL.MODAL)
			setValues(INITIAL.VALUES)
		},
		listExploration() {
			startLoading('bar')

			API('explorations', {
				id_scenery: SCENERY.id,
			})
				.read(({ data }) => {
					setList((state) => ({
						...state,
						rows: data.response,
					}))
				})
				.finally(stopLoading)
		},
		createExploration() {
			startLoading('circular')

			API('explorations', {
				...values,
				id_scenery: SCENERY.id,
			})
				.create(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetExploration)
				.then(handle.listExploration)
				.catch(stopLoading)
		},
		updateExploration() {
			startLoading('circular')

			API('explorations', values)
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetExploration)
				.then(handle.listExploration)
				.catch(stopLoading)
		},
		deleteExploration() {
			startLoading('circular')

			API('explorations', values)
				.delete(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetExploration)
				.then(handle.listExploration)
				.catch(stopLoading)
		},
		startExploration() {
			startLoading('circular')

			const { id: id_exploration, ...rest } = values

			API('explorations-board', {
				id_exploration,
				...rest
			})
				.create(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetExploration)
				.catch(stopLoading)
		}
	}

	useEffect(() => {
		if (SCENERY.id) {
			handle.listExploration()
		}
	}, [SCENERY.id])

	return {
		list,
		handle,
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
	}
}