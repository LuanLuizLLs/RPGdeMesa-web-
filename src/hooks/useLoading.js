import { useGlobalContext } from '../global/context'

export const INITIAL_LOADING = {
	type: ''
}

const useLoading = () => {
	const { loading, setLoading } = useGlobalContext()

	const startLoading = (type = '') => {
		setLoading({
			type,
		})
	}

	const stopLoading = () => {
		setLoading(INITIAL_LOADING)
	}

	return {
		loading,
		startLoading,
		stopLoading,
	}
}

export default useLoading