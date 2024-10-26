import { useState } from 'react'
import { useSelector } from 'react-redux'
import { INITIAL } from '../utils/constants'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useSse from 'hooks/useSse'
import API from 'services/api'

export function useFeatures() {
	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const { CHARACTER } = useSelector(({ reducer }) => reducer)

	const [list, setList] = useState(INITIAL.LIST)
	const [modal, setModal] = useState(INITIAL.MODAL)
	const [values, setValues] = useState(INITIAL.VALUES)

	const handle = {
		openModal(content, data = {}) {
			setModal({ content, data })
			setValues({ ...values, ...data })
		},
		resetFeature() {
			setModal(INITIAL.MODAL)
			setValues(INITIAL.VALUES)
		},
		listFeature() {
			API('features', {
				id_character: CHARACTER.id,
			})
				.read(({ data }) => {
					setList((state) => ({
						...state, rows: data.response,
					}))
				})
				.finally(stopLoading)
		},
		createFeature() {
			startLoading('bar')

			API('features', {
				...values,
				id_character: CHARACTER.id,
			})
				.create(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetFeature)
				.then(handle.listFeature)
				.catch(stopLoading)
		},
		deleteFeature() {
			startLoading('bar')

			API('features', values)
				.delete(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetFeature)
				.then(handle.listFeature)
				.catch(stopLoading)
		}
	}

	useSse('player', () => {
		handle.listFeature()
	})

	return {
		list,
		handle,
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
	}
}