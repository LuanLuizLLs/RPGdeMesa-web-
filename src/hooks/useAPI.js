import { useEffect, useState } from 'react'
import useLoading from './useLoading'
import useMessage from './useMessage'
import API from '../services/api'

const useAPI = (route, params) => {
	const [list, setList] = useState([])

	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const request = {
		list,
		fetch: () => {
			API(route, params).read(({ data }) => setList(data.response))
		},
		read: async (payload) => {
			startLoading('bar')
			try {
				const { data } = await API(route, payload).read()
				openMessage(data.status, data.message)
				return data.response
			} catch ({ response }) {
				openMessage(response.data.status, response.data.message)
			} finally {
				stopLoading()
			}
		},
		create: async (payload) => {
			startLoading('bar')
			try {
				const { data } = await API(route, payload).create()
				openMessage(data.status, data.message)
			} catch ({ response }) {
				openMessage(response.data.status, response.data.message)
			} finally {
				stopLoading()
			}
		},
		update: async (payload) => {
			startLoading('bar')
			try {
				const { data } = await API(route, payload).update()
				openMessage(data.status, data.message)
			} catch ({ response }) {
				openMessage(response.data.status, response.data.message)
			} finally {
				stopLoading()
			}
		},
		delete: async (payload) => {
			startLoading('bar')
			try {
				const { data } = await API(route+2, payload).delete()
				openMessage(data.status, data.message)
			} catch ({ response }) {
				openMessage(response.data.status, response.data.message)
			} finally {
				stopLoading()
			}
		},
	}

	useEffect(request.fetch, [])

	return request
}

export default useAPI