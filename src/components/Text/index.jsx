import React from 'react'
import PropTypes from 'prop-types'
import classes from './style.module.css'
import theme from '../../theme'

export const Text = ({
  children,
  inline,
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

  return inline ? (
    <span style={style}>
      {children}
    </span>
  ) : (
    <p className={classes.text} style={style}>
      {children}
    </p>
  )
}

Text.propTypes = {
  children: PropTypes.any,
  inline: PropTypes.any,
  display: PropTypes.string,
  color: PropTypes.string,
  fontWeight: PropTypes.string,
  textAlign: PropTypes.string,
  whiteSpace: PropTypes.string,
}