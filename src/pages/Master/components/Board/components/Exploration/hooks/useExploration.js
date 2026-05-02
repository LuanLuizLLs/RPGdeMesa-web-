import { useState } from 'react'
import { sceneryStore } from 'pages/Master/utils/store'
import { INITIAL } from '../utils/constants'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useStore from 'hooks/useStore'
import usePusher from 'hooks/usePusher'
import API from 'services/api'

export function useExploration() {
	const SCENERY = useStore(sceneryStore)

	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const [list, setList] = useState(INITIAL.LIST)
	const [modal, setModal] = useState(INITIAL.MODAL)
	const [action, setAction] = useState(INITIAL.ACTION)
	const [values, setValues] = useState(INITIAL.VALUES)

	const handle = {
		openExploration(content, data = modal.data) {
			setModal({ content, data })
			setValues({ ...values, ...data })
		},
		resetExploration() {
			setModal(INITIAL.MODAL)
			setAction(INITIAL.ACTION)
			setValues(INITIAL.VALUES)
		},
		listExploration() {
			API('explorations-board', {
				id_scenery: SCENERY.id,
				active: 1,
			})
				.read(({ data }) => {
					const [exploration = {}] = data.response
					setList(exploration)
				})
				.finally(stopLoading)
		},
		updateExploration() {
			startLoading('circular')

			const { id, board } = list
			const { vertical, horizontal, ...rest } = values

			const updated = new Array(...board)
			updated[horizontal][vertical] = rest

			if (action.type === 'move') {
				updated[action.data.horizontal][action.data.vertical] = null
			}

			API('explorations-board', {
				id,
				board: updated
			})
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetExploration)
				.then(handle.listExploration)
				.catch(stopLoading)
		},
		removeExploration() {
			startLoading('circular')

			const { id, board } = list
			const { vertical, horizontal } = values

			const updated = new Array(...board)
			updated[horizontal][vertical] = null

			API('explorations-board', {
				id,
				board: updated
			})
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetExploration)
				.then(handle.listExploration)
				.catch(stopLoading)
		},
		deleteExploration() {
			API('explorations-board', list)
				.delete(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetExploration)
				.then(handle.listExploration)
				.catch(stopLoading)
		},
		moveExploration() {
			setModal(INITIAL.MODAL)
			setAction({
				type: 'move',
				data: values
			})
		},
		duplicateExploration() {
			setModal(INITIAL.MODAL)
			setAction({
				type: 'duplicate',
				data: values
			})
		},
	}

	usePusher('exploration', SCENERY.id, () => {
		handle.listExploration()
	})

	return {
		handle,
		stateList: [list, setList],
		stateModal: [modal, setModal],
		stateAction: [action, setAction],
		stateValues: [values, setValues],
	}
}