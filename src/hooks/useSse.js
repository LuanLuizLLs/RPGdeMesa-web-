import { useEffect, useState } from 'react'
import { SSE } from 'services/sse'

const sse = new SSE()

function useSse(key, callback, deps = [], enable = true) {
	const [event, setEvent] = useState(null)

	sse.defineEvent(key, setEvent)

	useEffect(() => {
		if (enable) callback(event)
	}, [event, ...deps])
}

export default useSse