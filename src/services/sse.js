export class SSE {
	event = new EventSource(`http://${window.location.hostname}:8000/services/sse`)

	defineEvent(key, callback) {
		this.event.addEventListener(key, ({ data }) => {
			callback(data)
		})
	}
}