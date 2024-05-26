import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { INITIAL } from '../constants/initial'
import useLoading from '../../../../../hooks/useLoading'
import useMessage from '../../../../../hooks/useMessage'
import useRefresh from '../../../../../hooks/useRefresh'
import API from '../../../../../services/api'

export function useInteractions() {
	const [list, setList] = useState(INITIAL.LIST)
	const [modal, setModal] = useState(INITIAL.MODAL)
	const [values, setValues] = useState(INITIAL.VALUES)

	const { CAMPAIGN } = useSelector(({ reducer }) => reducer)

	const { openMessage } = useMessage()
	const { refreshData } = useRefresh()
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
			API('interactions', {
				id_campaign: CAMPAIGN.id,
			})
				.read(({ data }) => {
					setList((state) => ({
						...state,
						rows: data.response,
					}))
				})
		},
		createInteraction() {
			startLoading('bar')

			API('interactions', {
				...values,
				id_campaign: CAMPAIGN.id,
			})
				.create(({ data }) => {
					handle.listInteraction()
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetInteraction)
		},
		updateInteraction() {
			startLoading('bar')

			API('interactions', values)
				.update(({ data }) => {
					handle.listInteraction()
					refreshData('interactions-board')
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetInteraction)
		},
		deleteInteraction() {
			startLoading('bar')

			API('interactions', values)
				.delete(({ data }) => {
					handle.listInteraction()
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetInteraction)
		},
		startInteraction() {
			startLoading('bar')

			const { id: id_interaction, ...rest } = values

			API('interactions-board', {
				id_interaction,
				...rest
			})
				.create(({ data }) => {
					refreshData('interactions-board')
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetInteraction)
		}
	}

	useEffect(() => {
		handle.listInteraction()
	}, [CAMPAIGN.id])

	return {
		list,
		handle,
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
	}
}