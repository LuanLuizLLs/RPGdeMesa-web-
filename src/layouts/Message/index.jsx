import React, { useEffect } from 'react'
import classes from './style.module.css'
import useMessage from '../../hooks/message'

function Message({
  stateMessage = [],
}) {

  const [state = {}] = stateMessage

  const { closeMessage } = useMessage()

  const style = {
    width: state.open ? '100%' : '0',
  }

  useEffect(() => {
    if (state.open) {
      setTimeout(closeMessage, state.time)
    }
  }, [state, closeMessage])

  return (
    <div className={classes.container}>
      <div className={classes.hidden} style={style}>
        <div className={classes.message} type={state.type} onClick={closeMessage}>
          {state.message || 'Teste de mensagem'}
        </div>
      </div>
    </div>
  )
}

export default Message