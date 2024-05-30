import { useState } from 'react'
import { useSelector } from 'react-redux'
import { INITIAL } from '../constants/initial'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useSse from 'hooks/useSse'
import API from 'services/api'

export function useAbilities() {
	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const { USER, CHARACTER } = useSelector(({ reducer }) => reducer)

	const [list, setLists] = useState(INITIAL.LIST)
	const [modal, setModal] = useState(INITIAL.MODAL)
	const [values, setValues] = useState(INITIAL.VALUES)

	const handle = {
		openModal(content, data = {}) {
			setModal({ content, data, })
			setValues({ ...values, ...data })
		},
		resetAbility() {
			setModal(INITIAL.MODAL)
			setValues(INITIAL.VALUES)
			stopLoading()
		},
		listAbility() {
			API('abilities', {
				id_character: CHARACTER.id,
			})
				.read(({ data }) => {
					setLists((state) => ({
						...state, rows: data.response,
					}))
				})
		},
		createAbility() {
			startLoading('bar')

			API('abilities', {
				...values,
				user: USER.id,
				id_character: CHARACTER.id,
			})
				.create(({ data }) => {
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetAbility)
		},
		updateAbility() {
			startLoading('bar')

			API('abilities', {
				...values,
				user: USER.id,
				level: values.level + 1,
			})
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetAbility)
		},
		deleteAbility() {
			startLoading('bar')

			API('abilities', values)
				.delete(({ data }) => {
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetAbility)
		},
	}

	useSse('player', () => {
		if (CHARACTER.id) {
			handle.listAbility()
		}
	}, [CHARACTER.id])

	return {
		list,
		handle,
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
	}
}