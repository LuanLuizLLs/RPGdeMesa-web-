import React from 'react'
import PropTypes from 'prop-types'
import classes from './style.module.css'
import theme, { clarity } from '../../theme'

export const Button = ({
  children,
  type = 'filled',
  color = 'primary',
  width = '100%',
  fontSize = '',
  padding = 0,
  disabled = false,
  onClick = () => { },
}) => {

  const style = {
    container: {
      padding,
    },
    button: {
      fontSize,
      width,
      ...({
        filled: {
          color: clarity(color),
          background: theme[color],
        },
        outline: {
          color: theme[color],
          borderColor: theme[color],
        }
      })[type],
    }
  }

  return (
    <div style={style.container}>
      <button className={classes.button} style={style.button} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    </div >
  )
}

Button.propTypes = {
  children: PropTypes.any,
  type: PropTypes.string.isRequired,
  color: PropTypes.string,
  width: PropTypes.string,
  fontSize: PropTypes.string,
  padding: PropTypes.number,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}