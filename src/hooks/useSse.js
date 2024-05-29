import { useEffect, useState } from 'react'
import { SSE } from 'services/sse'

const sse = new SSE()

function useSse(key, callback, deps = []) {
	const [event, setEvent] = useState(null)

	sse.defineEvent(key, setEvent)

	useEffect(() => {
		callback(event)
	}, [event, ...deps])
}

export default useSse