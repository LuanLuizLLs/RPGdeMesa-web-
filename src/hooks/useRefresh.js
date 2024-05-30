import { useGlobalContext } from 'context'

function useRefresh() {
	const { stateRefresh } = useGlobalContext()

	const [refresh, setRefresh] = stateRefresh

	function refreshData(key) {
		setRefresh((state) => ({
			...state,
			[key]: new Date()
		}))
	}

	function refreshTarget(key) {
		return refresh[key]
	}

	return {
		refreshData,
		refreshTarget
	}
}

export default useRefresh