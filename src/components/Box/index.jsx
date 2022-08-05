import React from 'react'
import PropTypes from 'prop-types'

export const Box = ({
  children, ...style
}) => {
  return (
    <div style={style}>
      {children}
    </div>
  )
}

Box.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
}