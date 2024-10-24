import {
	Routes,
	Route,
} from 'react-router-dom'
import Home from 'pages/Home'
import Login from 'pages/Login'
import Master from 'pages/Master'
import Player from 'pages/Player'
import NotFound from 'pages/NotFound'

function routes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="*" element={<NotFound />} />
			<Route path="/login" element={<Login />} />
			<Route path="/master" element={<Master />} />
			<Route path="/player" element={<Player />} />
			<Route path="/master/:id_campaign" element={<Master />} />
			<Route path="/player/:id_character" element={<Player />} />
		</Routes>
	)
}

export default routes