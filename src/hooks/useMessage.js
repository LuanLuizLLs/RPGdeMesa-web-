import { INITIAL, useGlobalContext } from 'context'

function useMessage(){
	const { stateMessage } = useGlobalContext(INITIAL.MESSAGE)

	const [state, setState] = stateMessage

	const openMessage = (type = '', message = '') => {
		setState({
			...state,
			type,
			message,
			open: true,
		})
	}

	const closeMessage = () => {
		setState({
			...state,
			open: false,
		})
	}

	return {
		stateMessage,
		openMessage,
		closeMessage,
	}
}

export default useMessage