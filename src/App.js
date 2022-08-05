import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Routes from './routes'
import Context from './global/context'
import Message from './layouts/Message'
import Loading from './layouts/Loading'

const INITIAL_CONTEXT = {
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
  
  const context = {
    loading: useState(INITIAL_CONTEXT.LOADING),
    message: useState(INITIAL_CONTEXT.MESSAGE),
  }
  
  const user = useSelector(({ reducer }) => reducer.USER)
  
  useEffect(() => {
    user.id || setNavigate('/login')
  }, [user, setNavigate])

  return (
    <Context.Provider value={context}>
      <Loading stateLoading={context.loading}>
        <Routes />
      </Loading>
      <Message stateMessage={context.message} />
    </Context.Provider>
  )
}

export default App