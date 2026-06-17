import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { INITIAL } from '../utils/constants'
import { characterAttributes } from '../utils/functions'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import API from 'services/api'

export function useCharacters() {
	const setNavigate = useNavigate()

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
		resetCharacter() {
			setModal(INITIAL.MODAL)
			setValues(INITIAL.VALUES)
		},
		listCharacter() {
			startLoading('bar')

			API('characters')
				.read(({ data }) => {
					setList((state) => ({
						...state, rows: data.response,
					}))
				})
				.finally(stopLoading)
		},
		createCharacter() {
			startLoading('circular')

			API('characters', {
				...values,
				...characterAttributes(values.race, values.caste),
			})
				.create(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetCharacter)
				.then(handle.listCharacter)
				.catch(stopLoading)
		},
		updateCharacter() {
			startLoading('circular')

			API('characters', values)
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetCharacter)
				.then(handle.listCharacter)
				.catch(stopLoading)
		},
		deleteCharacter() {
			startLoading('circular')

			API('characters', values)
				.delete(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetCharacter)
				.then(handle.listCharacter)
				.catch(stopLoading)
		},
		startCharacter() {
			setNavigate(`/player/${values.id}`)
		},
	}

	useEffect(() => {
		handle.listCharacter()
	}, [])

	return {
		list,
		handle,
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
	}
}