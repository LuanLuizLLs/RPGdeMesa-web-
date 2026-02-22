class SseService {
	constructor() {
		this.event = null
	}

	connect(id) {
		if (!this.event) {
			this.event = new EventSource(`${process.env.REACT_APP_SSE_URL}/${id}`)
		}
	}

	init(key, callback) {
		if (this.event) {
			this.event.addEventListener(key, ({ data }) => {
				callback(data)
			})
		}
	}

	close() {
		if (this.event) {
			this.event.close()
		}
	}
}

const SSE = new SseService()

export default SSE