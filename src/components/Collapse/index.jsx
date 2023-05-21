import React from 'react'
import PropTypes from 'prop-types'
import classes from './style.module.css'

export const Collapse = ({
	children,
	name = '',
	stateCollapse = [true],
}) => {

	const [collapse] = stateCollapse

	const style = {
		height: collapse[name] ? '100%' : '0'
	}

	return (
		<div className={classes.collapse} style={style}>
			{children}
		</div>
	)
}

Collapse.propTypes = {
	children: PropTypes.any.isRequired,
	name: PropTypes.string.isRequired,
	stateCollapse: PropTypes.array.isRequired,
}