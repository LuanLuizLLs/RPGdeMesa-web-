import React from 'react'
import theme from '../../theme'
import PropTypes from 'prop-types'
import classes from './style.module.css'

export const Paper = ({
	children,
	margin = 0,
	padding = 10,
	overflow = '',
	textAlign = '',
	borderRadius = 10,
	backgroundColor = '',
}) => {

	const style = {
		margin,
		padding,
		overflow,
		textAlign,
		borderRadius,
		backgroundColor: theme[backgroundColor],
	}

	return (
		<div className={classes.paper} style={style}>
			{children}
		</div>
	)
}

Paper.propTypes = {
	children: PropTypes.any,
	margin: PropTypes.any,
	padding: PropTypes.number,
	overflow: PropTypes.string,
	textAlign: PropTypes.string,
	borderRadius: PropTypes.string,
	backgroundColor: PropTypes.string.isRequired,
}