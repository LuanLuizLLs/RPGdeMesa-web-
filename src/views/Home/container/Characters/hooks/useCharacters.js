import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { INITIAL } from '../constants/initial'
import { characterAttributes } from '../utils'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import API from 'services/api'

export function useCharacters() {
	const setNavigate = useNavigate()
	const setDispatch = useDispatch()

	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const [list, setList] = useState(INITIAL.LIST)
	const [modal, setModal] = useState(INITIAL.MODAL)
	const [values, setValues] = useState(INITIAL.VALUES)

	const { USER } = useSelector(({ reducer }) => reducer)

	const handle = {
		openModal: (content, data = {}) => {
			setModal({ content, data })
			setValues({ ...values, ...data })
		},
		resetValues: () => {
			setModal(INITIAL.MODAL)
			setValues(INITIAL.VALUES)
			stopLoading()
		},
		listCharacter() {
			API('characters', {
				id_user: USER.id
			})
				.read(({ data }) => {
					setList((state) => ({
						...state, rows: data.response,
					}))
				})
		},
		createCharacter: () => {
			startLoading('bar')

			API('characters', {
				...values,
				...characterAttributes(values.race, values.caste),
				id_user: USER.id,
			})
				.create(({ data }) => {
					handle.listCharacter()
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetValues)
		},
		updateCharacter: () => {
			startLoading('bar')

			API('characters', values)
				.update(({ data }) => {
					handle.listCharacter()
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetValues)
		},
		deleteCharacter: () => {
			startLoading('bar')

			API('characters', values)
				.delete(({ data }) => {
					handle.listCharacter()
					openMessage(data.status, data.message)
				})
				.catch(({ response }) => {
					openMessage('error', response.data.message)
				})
				.finally(handle.resetValues)
		},
		startCharacter: () => {
			setDispatch({
				type: 'CHARACTER',
				data: values,
			})
			setNavigate('/player')
		},
	}

	useEffect(() => {
		handle.listCharacter()
	}, [USER.id])

	return {
		list,
		handle,
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
	}
}