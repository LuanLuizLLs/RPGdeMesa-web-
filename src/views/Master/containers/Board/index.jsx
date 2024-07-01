import React from 'react'
import Interactions from './containers/Interactions'
import Explorations from './containers/Explorations'

function Board({ current }) {
	return [
		<Interactions key="interactions" />,
		<Explorations key="explorations" />
	][current]
}

export default Board