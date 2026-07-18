export const comparativePassword = (first = '', secound = '') => {
	return {
		valid: (first === secound),
		validate: secound ? (first === secound) ? 'valid' : 'invalid' : 'default',
	}
}

export const validateUsername = (username = '') => {
	const valid = /^([\w]+)$/.test(username)
	return {
		valid: valid,
		validate: username ? valid ? 'valid' : 'invalid' : 'default',
	}
}

export const validateEmail = (email = '') => {
	const valid = /^([\w._+-]+)@(\w+\.\w+|\w+\.\w+\.\w+)$/.test(email)
	return {
		valid: valid,
		validate: email ? valid ? 'valid' : 'invalid' : 'default',
	}
}