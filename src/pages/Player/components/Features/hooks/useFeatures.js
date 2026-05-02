import { useEffect, useState } from 'react'
import { characterStore } from 'pages/Player/utils/store'
import { INITIAL } from '../utils/constants'
import useLoading from 'hooks/useLoading'
import useMessage from 'hooks/useMessage'
import useStore from 'hooks/useStore'
import API from 'services/api'

export function useFeatures() {
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
		resetFeature() {
			setModal(INITIAL.MODAL)
			setValues(INITIAL.VALUES)
		},
		listFeature() {
			startLoading('bar')

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
			startLoading('circular')

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
		updateFeature() {
			startLoading('circular')

			API('features', values)
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetFeature)
				.then(handle.listFeature)
				.catch(stopLoading)
		},
		deleteFeature() {
			startLoading('circular')

			API('features', values)
				.delete(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetFeature)
				.then(handle.listFeature)
				.catch(stopLoading)
		}
	}

	useEffect(() => {
		if (CHARACTER.id) {
			handle.listFeature()
		}
	}, [CHARACTER.id])

	return {
		list,
		handle,
		stateModal: [modal, setModal],
		stateValues: [values, setValues],
	}
}