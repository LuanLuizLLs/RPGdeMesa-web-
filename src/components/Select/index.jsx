import React from 'react'
import PropTypes from 'prop-types'
import classes from './style.module.css'

export const Select = ({
  name,
  label = '',
  placeholder = '',
  disabled = false,
  options = [],
  stateValue = [],
}) => {

  const [value, setValue] = stateValue

  return (
    <div className={classes.container}>
      <label className={classes.label}>{label}</label>
      <select
        disabled={disabled}
        className={classes.select}
        value={value[name]}
        data-selected={Boolean(value[name])}
        onChange={({ target }) => setValue({
          ...value, [name]: target.value
        })}
      >
        {placeholder && (
          <option value="" label={placeholder} />
        )}
        {options.map((item, i) => (
          <option key={i} value={item} label={item} />
        ))}
      </select>
    </div>
  )
}

Select.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  stateValue: PropTypes.array.isRequired,
}