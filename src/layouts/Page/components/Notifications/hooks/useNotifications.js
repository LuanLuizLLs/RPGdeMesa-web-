import { useState } from 'react'
import { INITIAL } from '../utils/constants'
import useMessage from 'hooks/useMessage'
import useLoading from 'hooks/useLoading'
import API from 'services/api'
import useSse from 'hooks/useSse'

export function useNotifications() {
	const [list, setList] = useState(INITIAL.LIST)
	const [modal, setModal] = useState(INITIAL.MODAL)
	const [values, setValues] = useState(INITIAL.VALUES)

	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const handle = {
		openModal(content, data = {}, row = {}) {
			setModal({ content, data })
			setValues({ ...row })
		},
		closeModal() {
			setModal(INITIAL.MODAL)
			setValues(INITIAL.VALUES)
		},
		listNotification() {
			startLoading('bar')

			API('notifications')
				.read(({ data }) => {
					setList(data.response)
				})
				.finally(stopLoading)
		},
		acceptNotification() {
			startLoading('circular')

			API(values.domain, values.data)[values.action](({ data }) => {
				openMessage(data.status, data.response)
			})
				.then(() => {
					API('notifications', values).delete()
				})
				.finally(handle.closeModal)
				.finally(stopLoading)
		},
		declineNotification() {
			startLoading('circular')

			API('notifications', values)
				.delete(({ data }) => {
					openMessage(data.status, data.response)
				})
				.finally(handle.closeModal)
		},
	}

	useSse('notification', () => {
		handle.listNotification()
	})

	return {
		handle,
		stateList: [list, setList],
		stateModal: [modal, setModal],
	}
}