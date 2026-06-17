import Auth from 'services/auth'
import useLogin from 'hooks/useLogin'
import useMessage from 'hooks/useMessage'
import useLoading from 'hooks/useLoading'

export function usePage() {
	const { submitLogout } = useLogin()
	const { openMessage } = useMessage()
	const { startLoading, stopLoading } = useLoading()

	const handle = {
		submitLogout: () => {
			startLoading('bar')

			Auth()
				.logout(({ data }) => {
					openMessage(data.status, data.message)
				})
				.then(submitLogout)
				.finally(stopLoading)
		},
	}

	return {
		handle,
	}
}