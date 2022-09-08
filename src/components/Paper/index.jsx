import React from 'react'
import theme from '../../theme'
import PropTypes from 'prop-types'
import classes from './style.module.css'

export const Paper = ({
  children,
  padding = 10,
  borderRadius = 10,
  backgroundColor = '',
}) => {

  const style = {
    padding,
    borderRadius,
    backgroundColor: theme[backgroundColor],
  }

  return (
    <div className={classes.paper} style={style}>
      {children}
    </div>
  )
}

Paper.propTypes = {
  children: PropTypes.any,
}