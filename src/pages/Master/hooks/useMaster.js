import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { campaignAttributes } from '../utils/functions'
import { campaignStore } from '../utils/store'
import { INITIAL } from '../utils/constants'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useStore from 'hooks/useStore'
import useSse from 'hooks/useSse'
import API from 'services/api'

export function useMaster() {
	const setNavigate = useNavigate()

	const CAMPAIGN = useStore(campaignStore)

	const { id_campaign } = useParams()
	const { USER } = useSelector(({ reducer }) => reducer)

	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const [tab, setTab] = useState(INITIAL.TAB)
	const [values, setValues] = useState(CAMPAIGN)

	const handle = {
		loadCampaign() {
			API('campaigns', {
				id: id_campaign,
				user: USER.id,
			})
				.read(({ data }) => {
					if (data.blocked) {
						openMessage(data.status, data.message)
						campaignStore.reset()
						return setNavigate('/')
					}
					const [campaign = INITIAL.VALUES] = data.response
					campaignStore.set(campaign)
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
				.finally(stopLoading)
		},
	}

	useSse('master', () => {
		handle.loadCampaign()
	}, [USER.id], Boolean(USER.id))

	return {
		handle,
		stateTab: [tab, setTab],
		stateValues: [values, setValues]
	}
}