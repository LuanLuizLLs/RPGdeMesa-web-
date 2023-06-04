import { INITIAL, useGlobalContext } from '../context'

const useLoading = () => {
	const { stateLoading } = useGlobalContext()

	const [state, setState] = stateLoading 

	const startLoading = (type = '') => {
		setState({
			...state,
			type,
		})
	}

	const stopLoading = () => {
		setState(INITIAL.LOADING)
	}

	return {
		startLoading,
		stopLoading,
	}
}

export default useLoading