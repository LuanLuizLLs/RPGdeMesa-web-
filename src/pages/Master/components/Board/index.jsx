import Interactions from './components/Interactions'
import Explorations from './components/Explorations'

function Board({ current }) {
	return [
		<Interactions key="interactions" />,
		<Explorations key="explorations" />
	][current]
}

export default Board