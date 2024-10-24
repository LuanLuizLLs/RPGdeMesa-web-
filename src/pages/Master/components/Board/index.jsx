import Interaction from './components/Interaction'
import Exploration from './components/Exploration'

function Board({ current }) {
	return [
		<Interaction key="board-interaction" />,
		<Exploration key="board-exploration" />
	][current]
}

export default Board