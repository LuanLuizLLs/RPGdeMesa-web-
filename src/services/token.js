const Token = {
	get() {
		return localStorage.getItem('token') ?? ''
	},
	set(token) {
		return localStorage.setItem('token', token)
	},
	remove() {
		return localStorage.removeItem('token')
	},
}

export default Token