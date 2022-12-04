import React, { useEffect } from 'react'
import classes from './style.module.css'
import useMessage from '../../hooks/message'

function Message({
  stateMessage = [],
}) {

  const [state = {}] = stateMessage

  const { closeMessage } = useMessage()

  const style = {
    transform: state.open ? 'translateX(0)' : 'translateX(200%)',
  }

  useEffect(() => {
    const { time = 15000 } = state
    setTimeout(closeMessage, time)
  }, [state, closeMessage])

  return (
    <div className={classes.container} style={style}>
      <div className={classes.message} type={state.type} onClick={closeMessage}>
        {state.message}
      </div>
    </div>
  )
}

export default Message