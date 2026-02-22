import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SSE from 'services/sse'

function useSse(event, callback, deps = [], enable = true) {
	const [trigged, setTrigged] = useState(null)

	const { USER = {} } = useSelector(({ reducer }) => reducer)

	useEffect(() => {
		SSE.connect(USER.id)
		SSE.init(event, setTrigged)

		return () => {
			if (!USER.id) SSE.close()
		}
	}, [USER.id])

	useEffect(() => {
		if (enable) callback()
	}, [trigged, ...deps])
}

export default useSse