import React from 'react'
import PropTypes from 'prop-types'
import classes from './style.module.css'
import theme from '../../theme'

export const Text = ({
  children,
  color = 'black',
  fontSize = '',
  fontWeight = '',
  textAlign = '',
  whiteSpace = '',
}) => {

  const style = {
    fontSize,
    fontWeight,
    textAlign,
    whiteSpace,
    color: theme[color]
  }

  return (
    <p className={classes.text} style={style}> 
      {children}
    </p>
  )
}

Text.propTypes = {
  children: PropTypes.any,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  textAlign: PropTypes.string,
  whiteSpace: PropTypes.string,
}