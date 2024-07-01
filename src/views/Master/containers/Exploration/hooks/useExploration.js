import { useState } from 'react'
import { useSelector } from 'react-redux'
import { INITIAL } from '../constants'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useSse from 'hooks/useSse'
import API from 'services/api'

export function useExploration() {
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
			API('explorations', {
				id_campaign: CAMPAIGN.id,
			})
				.read(({ data }) => {
					setList((state) => ({
						...state,
						rows: data.response,
					}))
				})
		},
		createExploration() {
			startLoading('bar')

			API('explorations', {
				...values,
				id_campaign: CAMPAIGN.id,
			})
				.create(({ data }) => {
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage(response.data.status, response.data.message)
				})
				.finally(handle.resetExploration)
		},
		updateExploration() {
			startLoading('bar')

			API('explorations', values)
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage(response.data.status, response.data.message)
				})
				.finally(handle.resetExploration)
		},
		deleteExploration() {
			startLoading('bar')

			API('explorations', values)
				.delete(({ data }) => {
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage(response.data.status, response.data.message)
				})
				.finally(handle.resetExploration)
		},
		startExploration() {
			startLoading('bar')

			const { id: id_interaction, ...rest } = values

			API('explorations-board', {
				id_interaction,
				...rest
			})
				.create(({ data }) => {
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
		list,
		handle,
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
	}
}