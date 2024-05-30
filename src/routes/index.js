import React from 'react'
import {
	Routes,
	Route,
} from 'react-router-dom'
import Home from 'views/Home'
import Login from 'views/Login'
import Master from 'views/Master'
import Player from 'views/Player'
import NotFound from 'views/NotFound'

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