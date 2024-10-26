import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useMessage from 'hooks/useMessage'
import useLoading from 'hooks/useLoading'
import useAuth from 'hooks/useLogin'
import API from 'services/api'
import { comparativePassword } from '../utils/functions'
import { INITIAL } from '../utils/constants'
import { isNull } from 'utils/functions'

export function useLogin() {
	const setNavigate = useNavigate()

	const { submitLogin } = useAuth()
	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const [view, setView] = useState(INITIAL.VIEW)
	const [values, setValues] = useState(INITIAL.VALUES)

	const handle = {
		alterView(view = INITIAL.VIEW) {
			setView(view)
			setValues({
				...INITIAL.VALUES,
				name: values.name,
			})
		},
		resetLogin() {
			setView(INITIAL.VIEW)
		},
		submitLogin() {
			if (isNull(values, ['new_password'])) {
				return openMessage('warning', 'Preencha todos os dados')
			}
      
			startLoading('circular')

			API('users', values)
				.read(({ data }) => {
					const [user = {}] = data.response
					openMessage(data.status, data.message)
					submitLogin(user)
					setNavigate('/')
				})
				.finally(stopLoading)
		},
		submitRegister() {
			if (isNull(values)) {
				return openMessage('warning', 'Preencha todos os dados')
			} else if (!comparativePassword(values.password, values.new_password).valid) {
				return openMessage('warning', 'As senhas não coincidem')
			}

			startLoading('bar')

			API('users', values)
				.create(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetLogin)
				.finally(stopLoading)
		},
		submitRecover() {
			if (isNull(values)) {
				return openMessage('warning', 'Preencha todos os dados')
			} else if (!comparativePassword(values.password, values.new_password).valid) {
				return openMessage('warning', 'As senhas não coincidem')
			}

			startLoading('bar')

			API('users', values)
				.update(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetLogin)
				.finally(stopLoading)
		},
	}

	return {
		view,
		handle,
		stateValues: [values, setValues]
	}
}