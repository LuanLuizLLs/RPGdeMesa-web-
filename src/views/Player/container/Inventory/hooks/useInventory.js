import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { optionsUsable } from '../utils'
import { INITIAL } from '../constants/initial'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useSse from 'hooks/useSse'
import API from 'services/api'

export function useInventory() {
	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const [list, setList] = useState(INITIAL.LIST)
	const [modal, setModal] = useState(INITIAL.MODAL)
	const [values, setValues] = useState(INITIAL.VALUES)

	const { USER, CHARACTER } = useSelector(({ reducer }) => reducer)

	const handle = {
		openModal(content, data = {}) {
			setModal({ content, data })
			setValues({ ...values, ...data })
		},
		resetInventory() {
			setModal(INITIAL.MODAL)
			setValues(INITIAL.VALUES)
			stopLoading()
		},
		listInventory() {
			API('items', {
				id_character: CHARACTER.id,
			})
				.read(({ data }) => {
					setList((state) => ({
						...state, rows: data.response,
					}))
				})
		},
		createInventory() {
			startLoading('bar')

			API('items', {
				...values,
				user: USER.id,
				id_character: CHARACTER.id,
			})
				.create(({ data }) => {
					handle.listInventory()
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetInventory)
		},
		updateInventory() {
			startLoading('bar')

			API('items', {
				...values,
				user: USER.id,
				level: values.level + 1,
			})
				.update(({ data }) => {
					handle.listInventory()
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetInventory)
		},
		deleteInventory() {
			startLoading('bar')

			API('items', {
				...values,
			})
				.delete(({ data }) => {
					handle.listInventory()
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetInventory)
		},
	}

	useSse('player', () => {
		if (CHARACTER.id) {
			handle.listInventory()
		}
	}, [CHARACTER.id])

	useEffect(() => {
		const [attribute] = optionsUsable(values.usable)
		setValues((state) => ({
			...state,
			attribute,
		}))
	}, [values.usable])

	return {
		list,
		handle,
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
	}
}