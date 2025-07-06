import { useEffect, useState } from 'react'
import { characterStore } from 'pages/Player/utils/store'
import { INITIAL } from '../utils/constants'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useStore from 'hooks/useStore'
import useSse from 'hooks/useSse'
import API from 'services/api'
import { optionsActive } from '../utils/functions'

export function useAbilities() {
	const CHARACTER = useStore(characterStore)

	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

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

			API('abilities', values)
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
	}, [CHARACTER.id], Boolean(CHARACTER.id))

	useEffect(() => {
		if (modal.content === 'create_ability') {
			const [attribute] = optionsActive(values.active)
			setValues((state) => ({
				...state,
				attribute,
			}))
		}
	}, [values.active])

	return {
		list,
		handle,
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
	}
}