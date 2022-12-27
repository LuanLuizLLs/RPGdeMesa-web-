import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { INITIAL_LOADING } from './hooks/useLoading'
import { INITIAL_MESSAGE } from './hooks/useMessage'
import Routes from './routes'
import Context from './global/context'
import Message from './layouts/Message'
import Loading from './layouts/Loading'

function App() {

  const setNavigate = useNavigate()

  const { USER } = useSelector(({ reducer }) => reducer)

  const [loagind, setLoading] = useState(INITIAL_LOADING)
  const [message, setMessage] = useState(INITIAL_MESSAGE)
  
  const initialContext = {
    setLoading,
    setMessage,
  }
  
  useEffect(() => {
    USER.id || setNavigate('/useLogin')
  }, [USER, setNavigate])

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