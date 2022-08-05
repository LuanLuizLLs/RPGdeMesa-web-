import React from 'react'
import classes from './style.module.css'

function Loading({
  children,
  stateLoading = [{ type: '' }],
}) {

  const [loading] = stateLoading

  return (
    <div className={classes.loading} loading={loading.type}>
      {children}
    </div>
  )
}

export default Loading