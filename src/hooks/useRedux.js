import { useDispatch, useSelector } from 'react-redux'
import { INITIAL } from '../global/reducer/initial'

function useRedux() {
	const dispatch = useDispatch()

	const setRedux = (type, data = {}) => {
		dispatch({ type, data })
	}

	const getRedux = () => {
		return Object.assign(INITIAL, useSelector(({ reducer }) => reducer))
	}

	return {
		setRedux,
		getRedux,
	}
}

export default useRedux