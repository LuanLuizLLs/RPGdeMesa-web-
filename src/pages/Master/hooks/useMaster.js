import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { campaignAttributes } from '../utils/functions'
import { campaignStore } from '../utils/store'
import { INITIAL } from '../utils/constants'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useSse from 'hooks/useSse'
import API from 'services/api'

export function useMaster() {
	const setNavigate = useNavigate()

	const { id_campaign } = useParams()

	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const [tab, setTab] = useState(INITIAL.TAB)
	const [values, setValues] = useState(INITIAL.VALUES)

	const handle = {
		loadCampaign() {
			startLoading('bar')

			API('campaigns', {
				id: id_campaign
			})
				.read(({ data }) => {
					const [campaign = null] = data.response

					if (!campaign) {
						openMessage(data.status, data.message)
						campaignStore.reset()
						return setNavigate('/')
					}

					campaignStore.set(campaign)
					setValues(campaign)
				})
				.finally(stopLoading)
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
				.then(handle.loadCampaign)
				.catch(stopLoading)
		},
	}

	useSse('master', () => {
		handle.loadCampaign()
	})

	return {
		handle,
		stateTab: [tab, setTab],
		stateValues: [values, setValues]
	}
}