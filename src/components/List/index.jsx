import React from 'react'
import PropTypes from 'prop-types'
import classes from './style.module.css'

export const List = ({
  height = 0,
  rows = [],
  columns = {},
  actions = () => { },
  onClick = () => { },
  noColumns = false,
}) => {

  const style = {
    height,
  }

  return (
    <div className={classes.container} style={style}>
      <table className={classes.list}>
        {noColumns || (
          <thead>
            <tr>
              {Object.values(columns).map((item, i) => (
                <th key={i}>{item}</th>
              ))}
              {actions && (<th />)}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {Object.entries(row).map(([key, item], i) => Boolean(columns[key]) && (
                <td key={i} title={item} onClick={() => onClick(row)}>{item}</td>
              ))}
              {Boolean(actions) && (
                <td className={classes.actions} key={i}>{actions(row)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

List.propTypes = {
  height: PropTypes.number.isRequired,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.object,
  actions: PropTypes.func,
  onClick: PropTypes.func,
  noColumns: PropTypes.bool,
}