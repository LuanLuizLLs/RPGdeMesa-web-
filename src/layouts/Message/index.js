import React, { useEffect } from 'react'
import classes from './style.module.css'

const openMessage = (open) => {
  return Boolean(open) ? 'translateX(0)' : 'translateX(200%)'
}

function Message({
  stateMessage = [{
    type: '',
    message: '',
    time: 0
  }],
}) {

  const [state, setState] = stateMessage

  const style = {
    transform: openMessage(state.type),
  }

  useEffect(() => {
    const { time = 15000 } = state
    setTimeout(() => setState({}), time)
  }, [state, setState])

  return (
    <div className={classes.container}>
      <div className={classes.message} style={style} type={state.type} onClick={() => setState({})}>
        {state.message}
      </div>
    </div>
  )
}

export default Message