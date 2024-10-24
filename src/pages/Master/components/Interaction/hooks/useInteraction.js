import { useState } from 'react'
import { useSelector } from 'react-redux'
import { INITIAL } from '../utils/constants'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useSse from 'hooks/useSse'
import API from 'services/api'

export function useInteraction() {
	const { CAMPAIGN } = useSelector(({ reducer }) => reducer)

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
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage(response.data.status, response.data.message)
				})
				.finally(handle.resetInteraction)
		},
		updateInteraction() {
			startLoading('bar')

			API('interactions', values)
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage(response.data.status, response.data.message)
				})
				.finally(handle.resetInteraction)
		},
		deleteInteraction() {
			startLoading('bar')

			API('interactions', values)
				.delete(({ data }) => {
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage(response.data.status, response.data.message)
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
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage(response.data.status, response.data.message)
				})
				.finally(handle.resetInteraction)
		}
	}

	useSse('master', () => {
		if (CAMPAIGN.id) {
			handle.listInteraction()
		}
	}, [CAMPAIGN.id])

	return {
		list,
		handle,
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
	}
}