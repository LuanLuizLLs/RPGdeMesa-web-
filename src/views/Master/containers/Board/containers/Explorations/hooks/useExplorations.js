import { useState } from 'react'
import { useSelector } from 'react-redux'
import { INITIAL } from '../constants/initial'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useSse from 'hooks/useSse'
import API from 'services/api'

export function useExplorations() {
	const { CAMPAIGN } = useSelector(({ reducer }) => reducer)

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
			stopLoading()
		},
		listExploration() {
			API('explorations-board', {
				id_campaign: CAMPAIGN.id,
				active: 1,
			})
				.read(({ data }) => {
					const [exploration = {}] = data.response
					setList(exploration)
				})
		},
		updateExploration() {
			startLoading('bar')

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
				.catch(({ response }) => {
					openMessage(response.data.status, response.data.message)
				})
				.finally(handle.resetExploration)
		},
		removeExploration() {
			startLoading('bar')

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
				.catch(({ response }) => {
					openMessage(response.data.status, response.data.message)
				})
				.finally(handle.resetExploration)
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

	useSse('master', () => {
		if (CAMPAIGN.id) {
			handle.listExploration()
		}
	}, [CAMPAIGN.id])
  
	return {
		handle,
		stateList: [list, setList],
		stateModal: [modal, setModal],
		stateAction: [action, setAction],
		stateValues: [values, setValues],
	}
}