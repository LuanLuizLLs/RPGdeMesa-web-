import React from 'react'
import PropTypes from 'prop-types'
import classes from './style.module.css'
import theme, { contrast } from '../../theme'

export const Badge = ({
  children,
  padding = 8,
  margin = 4,
  color = 'primary',
  borderRadius = 8,
}) => {

  const style = {
    padding,
    margin,
    borderRadius,
    color: contrast(color),
    backgroundColor: theme[color],
  }

  return (
    <div className={classes.badge} style={style}>
      {children}
    </div>
  )
} 

Badge.propTypes = {
  children: PropTypes.any,
}