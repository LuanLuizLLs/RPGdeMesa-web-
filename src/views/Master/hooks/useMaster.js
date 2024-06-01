import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { campaignAttributes } from '../utils'
import { INITIAL } from '../constants'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useSse from 'hooks/useSse'
import API from 'services/api'

export function useMaster() {
	const setNavigate = useNavigate()
	const setDispatch = useDispatch()

	const { id_campaign } = useParams()
	const { CAMPAIGN, USER } = useSelector(({ reducer }) => reducer)

	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const [tab, setTab] = useState(INITIAL.TAB)
	const [values, setValues] = useState(CAMPAIGN)

	const handle = {
		loadCampaign() {
			API('campaigns', {
				id: id_campaign || CAMPAIGN.id,
				user: USER.id,
			})
				.read(({ data }) => {
					if (data.blocked) {
						openMessage(data.status, data.message)
						setDispatch({
							type: 'CAMPAIGN',
							data: {},
						})
						return setNavigate('/')
					}
					const [campaign = INITIAL.VALUES] = data.response
					setDispatch({
						type: 'CAMPAIGN',
						data: campaign,
					})
				})
		},
		updateCampaign(update = values) {
			startLoading('bar')

			API('campaigns', {
				...update,
				...campaignAttributes(update.period, update.climate),
			})
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(stopLoading)
		},
	}

	useSse('master', () => {
		handle.loadCampaign()
	}, [id_campaign, CAMPAIGN.id, USER.id])

	return {
		handle,
		stateTab: [tab, setTab],
		stateValues: [values, setValues]
	}
}