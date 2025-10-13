import { userStore } from 'pages/Login/utils/stores'

function useLogin() {
	const submitLogin = (data = {}) => {
		userStore.set(data)
	}

	const submitLogout = () => {
		userStore.set({})
	}

	return {
		submitLogin,
		submitLogout,
	}
}

export default useLogin