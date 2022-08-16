import React from 'react'
import PropTypes from 'prop-types'
import classes from './style.module.css'

export const Input = ({
  index = -1,
  name,
  max,
  min,
  type = 'text',
  label = '',
  icon = '',
  width = '',
  fontSize = '',
  validate = 'default',
  disabled = false,
  readOnly = false,
  placeholder = '',
  stateValue = [],
  onEnter = () => { },
}) => {

  const [value, setValue] = stateValue

  const style = {
    container: {
      fontSize,
    },
    component: {
      fontSize,
      width,
    },
  }

  return (
    <div className={classes.container} style={style.container}>
      <label className={classes.label}>
        {label}
      </label>
      <div className={classes.component} style={style.component} validate={validate}>
        {icon && (
          <span className={classes.icon}>
            {icon}
          </span>
        )}
        <input
          type={type}
          disabled={disabled}
          readOnly={readOnly}
          value={(index > -1) ? value[index][name] : value[name]}
          className={classes.input}
          placeholder={placeholder}
          onKeyDown={({ key }) => (key === 'Enter') && onEnter()}
          onChange={({ target }) => {
            if (!isNaN(min) && target.value < min) return
            if (!isNaN(max) && target.value > max) return
            setValue((state) => {
              if (index > -1) {
                return ({
                  ...state, [index]: {
                    ...state[index], [name]: target.value
                  }
                })
              }
              return ({
                ...state, [name]: target.value
              })
            })
          }}
        />
      </div>
    </div>
  )
}

Input.propTypes = {
  index: PropTypes.number,
  name: PropTypes.any.isRequired,
  max: PropTypes.number,
  min: PropTypes.number,
  type: PropTypes.string,
  fontSize: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  validate: PropTypes.string,
  placeholder: PropTypes.string,
  stateValue: PropTypes.array.isRequired,
}