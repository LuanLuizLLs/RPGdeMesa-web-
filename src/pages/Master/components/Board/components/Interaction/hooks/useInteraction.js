import { useState } from 'react'
import { adventureStore } from 'pages/Master/utils/store'
import { INITIAL } from '../utils/constants'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useStore from 'hooks/useStore'
import useSse from 'hooks/useSse'
import API from 'services/api'

export function useInteraction() {
	const ADVENTURE = useStore(adventureStore)

	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const [tab, setTab] = useState(INITIAL.TAB)
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
		},
		listInteraction() {
			API('interactions-board', {
				id_adventure: ADVENTURE.id,
			})
				.read(({ data }) => {
					setList(Object.assign({ ...INITIAL.LIST }, data.response))
				})
				.finally(stopLoading)
		},
		updateInteraction(update) {
			startLoading('bar')

			API('interactions-board', update)
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetInteraction)
				.then(handle.listInteraction)
				.catch(stopLoading)
		},
		removeInteraction() {
			startLoading('circular')

			API('interactions-board', values)
				.delete(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetInteraction)
				.then(handle.listInteraction)
				.catch(stopLoading)
		}
	}

	useSse('master', () => {
		handle.listInteraction()
	}, [ADVENTURE.id], Boolean(ADVENTURE.id))

	return {
		handle,
		stateTab: [tab, setTab],
		stateList: [list, setList],
		stateModal: [modal, setModal],
		stateValues: [values, setValues]
	}
}