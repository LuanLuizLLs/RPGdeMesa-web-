import React from 'react'
import PropTypes from 'prop-types'
import classes from './style.module.css'

export const TextArea = ({
  rows = 3,
  label = '',
  disabled = false,
  readOnly = false,
  placeholder = '',
  name = '',
  stateValue = [],
}) => {
  
  const [value, setValue] = stateValue

  return (
    <div className={classes.container}>
      <label className={classes.label}>
        {label}
      </label>
      <textarea
        rows={rows}
        disabled={disabled}
        readOnly={readOnly}
        value={value[name]}
        placeholder={placeholder}
        className={classes.textarea}
        onChange={({ target }) => setValue((state) => ({
          ...state, [name]: target.value
        }))}
      />
    </div>
  )
}

TextArea.propTypes = {
  rows: PropTypes.number,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  stateValue: PropTypes.array.isRequired,
}