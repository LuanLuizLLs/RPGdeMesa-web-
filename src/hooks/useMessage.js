import { useGlobalContext } from '../global/context'

export const INITIAL_MESSAGE = {
	type: '',
	message: '',
	open: false,
	time: 5000,
}

const useMessage = () => {
	const { message, setMessage } = useGlobalContext()

	const openMessage = (type = '', message = '') => {
		setMessage((state) => ({
			...state,
			type,
			message,
			open: true,
		}))
	}

	const closeMessage = () => {
		setMessage((state) => ({
			...state,
			open: false,
		}))
	}

	return {
		message,
		openMessage,
		closeMessage,
	}
}

export default useMessage