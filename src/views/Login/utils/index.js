function comparativePassword(first = '', secound = '') {
	return {
		valid: (first === secound),
		validate: secound ? (first === secound) ? 'valid' : 'invalid' : 'default',
	}
}

export {
	comparativePassword,
}