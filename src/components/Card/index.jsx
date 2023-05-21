import React from 'react'
import PropTypes from 'prop-types'
import classes from './style.module.css'

export const Card = ({
	children,
	margin = '',
	maxWidth = '',
	minHeight = '',
}) => {

	const style = {
		margin,
		maxWidth,
		minHeight,
	}

	return (
		<div className={classes.card} style={style}>
			{children}
		</div>
	)
}

Card.propTypes = {
	children: PropTypes.any.isRequired,
	margin: PropTypes.string,
	maxWidth: PropTypes.string,
	minHeight: PropTypes.string,
}