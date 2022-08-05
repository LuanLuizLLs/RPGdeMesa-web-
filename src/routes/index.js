import React from 'react'
import {
  Routes,
  Route,
} from 'react-router-dom'
import Home from '../views/Home'
import Login from '../views/Login'
import Master from '../views/Master'
import Player from '../views/Player'

function routes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/master" element={<Master />} />
      <Route path="/player" element={<Player />} />
    </Routes>
  )
}

export default routes