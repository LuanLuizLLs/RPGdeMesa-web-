import React from 'react'
import PropTypes from 'prop-types'
import classes from './style.module.css'

export const Grid = ({
	children,
	type,
	size = 12,
	flex = '1',
	open = false,
	margin = [0, 0],
	padding = [0, 0],
	minWidth = 0,
	maxWidth = '',
	alignItems = '',
	justifyContent = '',
	flexDirection = 'row',
}) => {

	const style = {
		margin: `${margin[0]}px ${margin[1]}px`,
		padding: `${padding[0]}px ${padding[1]}px`,
		...({
			container: {
				maxWidth,
			},
			row: {
				alignItems,
				flexDirection,
				justifyContent,
			},
			column: {
				flex,
				minWidth,
				maxWidth: `${(size * 100 / 12)}%`,
			},
			slide: {
				width: open ? `${(size * 100 / 12)}%` : '0',
			},
		})[type]
	}

	return (
		<div className={classes[type]} style={style}>
			{type === 'slide' ? <div>{children}</div> : children}
		</div>
	)
}

Grid.propTypes = {
	children: PropTypes.node,
	type: PropTypes.string.isRequired,
	size: PropTypes.number,
	flex: PropTypes.string,
	open: PropTypes.bool,
	margin: PropTypes.array,
	padding: PropTypes.array,
	minWidth: PropTypes.number,
	maxWidth: PropTypes.string,
	alignItems: PropTypes.string,
	justifyContent: PropTypes.string,
	flexDirection: PropTypes.string,
}