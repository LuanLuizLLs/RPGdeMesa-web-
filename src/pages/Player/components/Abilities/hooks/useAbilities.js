import { useState } from 'react'
import { useSelector } from 'react-redux'
import { INITIAL } from '../utils/constants'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useSse from 'hooks/useSse'
import API from 'services/api'

export function useAbilities() {
	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const { CHARACTER } = useSelector(({ reducer }) => reducer)

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
				.finally(stopLoading)
		},
		createAbility() {
			startLoading('bar')

			API('abilities', {
				...values,
				id_character: CHARACTER.id,
			})
				.create(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetAbility)
				.then(handle.listAbility)
				.catch(stopLoading)
		},
		updateAbility() {
			startLoading('bar')

			API('abilities', {
				...values,
				level: values.level + 1,
			})
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetAbility)
				.then(handle.listAbility)
				.catch(stopLoading)
		},
		deleteAbility() {
			startLoading('bar')

			API('abilities', values)
				.delete(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetAbility)
				.then(handle.listAbility)
				.catch(stopLoading)
		},
	}

	useSse('player', () => {
		handle.listAbility()
	})

	return {
		list,
		handle,
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
	}
}