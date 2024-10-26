import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { campaignAttributes } from '../utils/functions'
import { INITIAL } from '../utils/constants'
import useMessage from 'hooks/useMessage'
import useLoading from 'hooks/useLoading'
import useSse from 'hooks/useSse'
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
		openModal(content, data = {}) {
			setModal({ content, data })
			setValues({ ...values, ...data })
		},
		resetCampaign() {
			setModal(INITIAL.MODAL)
			setValues(INITIAL.VALUES)
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
				.finally(stopLoading)
		},
		createCampaign() {
			startLoading('circular')

			API('campaigns', {
				...values,
				...campaignAttributes(values.period, values.climate),
				id_user: USER.id,
			})
				.create(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetCampaign)
				.then(handle.listCampaign)
				.catch(stopLoading)
		},
		updateCampaign() {
			startLoading('circular')

			API('campaigns', values)
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetCampaign)
				.then(handle.listCampaign)
				.catch(stopLoading)
		},
		deleteCampaign() {
			startLoading('circular')

			API('campaigns', values)
				.delete(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetCampaign)
				.then(handle.listCampaign)
				.catch(stopLoading)
		},
		startCampaign() {
			setDispatch({
				type: 'CAMPAIGN',
				data: values,
			})
			setNavigate(`/master/${values.id}`)
		},
	}

	useSse('master', () => {
		handle.listCampaign()
	})

	return {
		list,
		handle,
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
	}
}