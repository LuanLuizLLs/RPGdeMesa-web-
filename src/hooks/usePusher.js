import { useEffect } from 'react'
import pusher from 'services/pusher'

function usePusher(event, id, callback) {
	useEffect(() => {
		if (event && id) {
			const channel = pusher.channel(`${event}.${id}`)

			channel.listen('PusherEvent', () => {
				callback()
			})

			callback()

			return () => {
				channel.stopListening(event)
			}
		}
	}, [event, id])
}

export default usePusher