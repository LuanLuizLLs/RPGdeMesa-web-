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
	const [values, setValues] = useState(INITIAL.VALUES)

	const handle = {
		openExploration(content, data = modal.data) {
			setModal({ content, data })
			setValues({ ...values, ...data })
		},
		resetExploration() {
			setModal(INITIAL.MODAL)
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
		}
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
		stateValues: [values, setValues]
	}
}