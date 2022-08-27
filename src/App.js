import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Routes from './routes'
import Context from './global/context'
import Message from './layouts/Message'
import Loading from './layouts/Loading'

const INITIAL = {
  LOADING: {
    type: '',
  },
  MESSAGE: {
    type: '',
    message: '',
  },
}

function App() {

  const setNavigate = useNavigate()

  const user = useSelector(({ reducer }) => reducer.USER)

  const [loagind, setLoading] = useState(INITIAL.LOADING)
  const [message, setMessage] = useState(INITIAL.MESSAGE)
  
  const initialContext = {
    setLoading,
    setMessage,
  }
  
  useEffect(() => {
    user.id || setNavigate('/login')
  }, [user, setNavigate])

  return (
    <Context.Provider value={initialContext}>
      <Loading stateLoading={[loagind, setLoading]}>
        <Routes />
      </Loading>
      <Message stateMessage={[message, setMessage]} />
    </Context.Provider>
  )
}

export default App