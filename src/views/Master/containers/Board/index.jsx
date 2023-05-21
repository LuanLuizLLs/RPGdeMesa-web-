import React from 'react'
import Interactions from './containers/Interactions'

function Board({ current }) {
	return [
		<Interactions key="interactions" />,
		<>EXPLORATION</>
	][current]
}

export default Board