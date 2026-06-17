import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function useLogin() {
	const setDispatch = useDispatch()
	const setNavigate = useNavigate()

	const submitLogin = (data) => {
		if (data) {
			setNavigate('/')
			setDispatch({
				type: 'USER',
				data,
			})
		}
	}

	const submitLogout = () => {
		setNavigate('/login')
		setDispatch({
			type: 'USER',
			data: {},
		})
	}

	return {
		submitLogin,
		submitLogout,
	}
}

export default useLogin