import { useDispatch } from 'react-redux'

function useLogin() {
	const setDispatch = useDispatch()

	const submitLogin = (data = {}) => {
		setDispatch({
			type: 'USER',
			data,
		})
	}

	const submitLogout = () => {
		setDispatch({
			type: 'INITIAL'
		})
	}

	return {
		submitLogin,
		submitLogout,
	}
}

export default useLogin