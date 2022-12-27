import React from 'react'
import {
  Routes,
  Route,
} from 'react-router-dom'
import Home from '../views/Home'
import Login from '../views/Login'
import Master from '../views/Master'
import Player from '../views/Player'
import NotFound from '../views/NotFound'

function routes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/useLogin" element={<Login />} />
      <Route path="/master" element={<Master />} />
      <Route path="/player" element={<Player />} />
      <Route path="/player/:id_character" element={<Player />} />

      { /** 404 Not Found */ }
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default routes