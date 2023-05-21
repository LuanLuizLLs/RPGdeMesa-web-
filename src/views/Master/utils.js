/**
 * Set condition color
 * @param {Number} condition 
 * @returns 
 */
export const colorConditions = (condition = 0) => {
	return condition ? (condition > 0 ? 'error' : 'success') : 'black'
}
