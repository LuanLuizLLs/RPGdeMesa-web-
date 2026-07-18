import { useState } from 'react'
import useMessage from 'hooks/useMessage'
import useLoading from 'hooks/useLoading'
import useAuth from 'hooks/useLogin'
import Auth from 'services/auth'
import { comparativePassword, validateEmail, validateUsername } from '../utils/functions'
import { INITIAL } from '../utils/constants'
import { isNull } from 'utils/functions'

export function useLogin() {
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
			})
		},
		resetLogin() {
			setView(INITIAL.VIEW)
		},
		submitLogin() {
			if (isNull(values, ['new_password', 'email', 'code'])) {
				return openMessage('warning', 'Preencha todos os dados')
			}

			startLoading('circular')

			Auth(values)
				.login(({ data }) => {
					openMessage(data.status, data.message)
					submitLogin(data.response)
				})
				.finally(stopLoading)
		},
		submitRegister() {
			if (isNull(values, ['code'])) {
				return openMessage('warning', 'Preencha todos os dados')
			}

			if (!validateEmail(values.email).valid) {
				return openMessage('warning', 'E-mail inválido')
			}

			if (!validateUsername(values.username).valid) {
				return openMessage('warning', 'Usuário inválido')
			}

			if (!comparativePassword(values.password, values.new_password).valid) {
				return openMessage('warning', 'As senhas não coincidem')
			}

			startLoading('bar')

			Auth(values)
				.register(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(handle.resetLogin)
				.finally(stopLoading)
		},
		sendEmail() {
			if (isNull(values, ['username', 'password', 'new_password', 'code'])) {
				return openMessage('warning', 'Preencha o campo de e-mail')
			}

			startLoading('bar')

			Auth(values)
				.sendCode(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(() => {
					handle.alterView('send_code')
				})
				.finally(stopLoading)
		},
		sendCode() {
			if (isNull(values, ['username', 'password', 'new_password', 'email'])) {
				return openMessage('warning', 'Preencha o campo de código')
			}

			startLoading('bar')

			Auth(values)
				.confirmCode(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(() => {
					handle.alterView('recover')
				})
				.finally(stopLoading)
		},
		submitRecover() {
			if (isNull(values, ['username', 'email', 'code'])) {
				return openMessage('warning', 'Preencha todos os dados')
			}

			if (!comparativePassword(values.password, values.new_password).valid) {
				return openMessage('warning', 'As senhas não coincidem')
			}

			startLoading('bar')

			Auth(values)
				.recover(({ data }) => {
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