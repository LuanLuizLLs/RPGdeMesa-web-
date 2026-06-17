import { useEffect, useState } from 'react'
import { characterStore } from 'pages/Player/utils/store'
import { INITIAL } from '../utils/constants/index.'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useStore from 'hooks/useStore'
import API from 'services/api'

export function useInventory() {
	const CHARACTER = useStore(characterStore)

	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const [list, setList] = useState(INITIAL.LIST)
	const [modal, setModal] = useState(INITIAL.MODAL)
	const [values, setValues] = useState(INITIAL.VALUES)

	const handle = {
		openModal(content, data = {}) {
			setModal({ content, data })
			setValues({ ...values, ...data })
		},
		resetInventory() {
			setModal(INITIAL.MODAL)
			setValues(INITIAL.VALUES)
		},
		listInventory() {
			startLoading('bar')

			API('items', {
				id_character: CHARACTER.id,
			})
				.read(({ data }) => {
					setList((state) => ({
						...state, rows: data.response,
					}))
				})
				.finally(stopLoading)
		},
		createInventory() {
			startLoading('circular')

			API('items', {
				...values,
				id_character: CHARACTER.id,
			})
				.create(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetInventory)
				.then(handle.listInventory)
				.catch(stopLoading)
		},
		updateInventory() {
			startLoading('circular')

			API('items', values)
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetInventory)
				.then(handle.listInventory)
				.catch(stopLoading)
		},
		deleteInventory() {
			startLoading('circular')

			API('items', {
				...values,
			})
				.delete(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetInventory)
				.then(handle.listInventory)
				.catch(stopLoading)
		},
	}

	useEffect(() => {
		if (CHARACTER.id) {
			handle.listInventory()
		}
	}, [CHARACTER.id])

	return {
		list,
		handle,
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
	}
}