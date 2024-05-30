import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { campaignAttributes } from '../utils'
import { INITIAL } from '../constants/initial'
import useMessage from 'hooks/useMessage'
import useLoading from 'hooks/useLoading'
import API from 'services/api'

export function useCampaigns() {
	const setNavigate = useNavigate()
	const setDispatch = useDispatch()

	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const [list, setList] = useState(INITIAL.LIST)
	const [modal, setModal] = useState(INITIAL.MODAL)
	const [values, setValues] = useState(INITIAL.VALUES)

	const { USER } = useSelector(({ reducer }) => reducer)

	const handle = {
		openModal: (content, data = {}) => {
			setModal({ content, data })
			setValues({ ...values, ...data })
		},
		resetValues: () => {
			setModal(INITIAL.MODAL)
			setValues(INITIAL.VALUES)
			stopLoading()
		},
		listCampaign() {
			API('campaigns', {
				id_user: USER.id
			})
				.read(({ data }) => {
					setList((state) => ({
						...state, rows: data.response,
					}))
				})
		},
		createCampaign: () => {
			startLoading('bar')

			API('campaigns', {
				...values,
				...campaignAttributes(values.period, values.climate),
				id_user: USER.id,
			})
				.create(({ data }) => {
					handle.listCampaign()
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetValues)
		},
		updateCampaign: () => {
			startLoading('bar')

			API('campaigns', values)
				.update(({ data }) => {
					handle.listCampaign()
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetValues)
		},
		deleteCampaign: () => {
			startLoading('bar')

			API('campaigns', values)
				.delete(({ data }) => {
					handle.listCampaign()
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetValues)
		},
		startCampaign: () => {
			setDispatch({
				type: 'CAMPAIGN',
				data: values,
			})
			setNavigate('/master')
		},
	}

	useEffect(() => {
		handle.listCampaign()
	}, [USER.id])

	return {
		list,
		handle,
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
	}
}