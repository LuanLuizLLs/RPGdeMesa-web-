import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { campaignAttributes } from '../utils'
import { INITIAL } from '../constants'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useSse from 'hooks/useSse'
import API from 'services/api'

export function useMaster() {
	const setDispatch = useDispatch()

	const { CAMPAIGN } = useSelector(({ reducer }) => reducer)

	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const [tab, setTab] = useState(INITIAL.TAB)
	const [values, setValues] = useState(CAMPAIGN)

	const handle = {
		loadCampaign() {
			API('campaigns', {
				id: CAMPAIGN.id,
			})
				.read(({ data }) => {
					const [campaign = {}] = data.response
					setDispatch({
						type: 'CAMPAIGN',
						data: campaign,
					})
				})
		},
		updateCampaign: (update = values) => {
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
	}, [CAMPAIGN.id])

	return {
		handle,
		stateTab: [tab, setTab],
		stateValues: [values, setValues]
	}
}