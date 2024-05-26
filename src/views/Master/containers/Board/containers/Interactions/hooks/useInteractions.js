import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { INITIAL } from '../constants/initial'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useRefresh from 'hooks/useRefresh'
import API from 'services/api'

export function useInteractions() {
	const [list, setList] = useState(INITIAL.LIST)
	const [modal, setModal] = useState(INITIAL.MODAL)
	const [values, setValues] = useState(INITIAL.VALUES)

	const { CAMPAIGN } = useSelector(({ reducer }) => reducer)

	const { openMessage } = useMessage()
	const { refreshTarget } = useRefresh()
	const { startLoading, stopLoading } = useLoading()

	const handle = {
		openInteraction(content, data = modal.data) {
			setModal({ content, data })
			setValues({ ...values, ...data })
		},
		resetInteraction() {
			setModal(INITIAL.MODAL)
			setValues(INITIAL.VALUES)
			stopLoading()
		},
		listInteraction() {
			API('interactions-board', {
				id_campaign: CAMPAIGN.id,
			})
				.read(({ data }) => {
					setList(Object.assign({ ...INITIAL.LIST }, data.response))
				})
		},
		updateInteraction(update) {
			API('interactions-board', update)
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage(response.data.status, response.data.message)
				})
				.finally(handle.resetInteraction)
		},
		removeInteraction() {
			startLoading('bar')

			API('interactions-board', values)
				.delete(({ data }) => {
					handle.listInteraction()
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage(response.data.status, response.data.message)
				})
				.finally(handle.resetInteraction)
		}
	}

	useEffect(() => {
		handle.listInteraction()
	}, [refreshTarget('interactions-board')])

	return {
		handle,
		stateList: [list, setList],
		stateModal: [modal, setModal],
		stateValues: [values, setValues]
	}
}