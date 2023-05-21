import React from 'react'
import PropTypes from 'prop-types'
import classes from './style.module.css'
import theme from '../../theme'

export const Title = ({
	children,
	type = 'h1',
	color = '',
	textAlign = '',
	textTransform = '',
	textDecoration = '',
}) => {

	const Component = (props) => ({
		h1: <h1 {...props}>{props.children}</h1>,
		h2: <h2 {...props}>{props.children}</h2>,
		h3: <h3 {...props}>{props.children}</h3>,
		h4: <h4 {...props}>{props.children}</h4>,
		h5: <h5 {...props}>{props.children}</h5>,
		h6: <h6 {...props}>{props.children}</h6>,
	})[type]

	const style = {
		color: theme[color],
		textAlign,
		textTransform,
		textDecoration,
	}

	return (
		<Component className={classes.title} style={style}>
			{children}
		</Component>
	)
}

Title.propTypes = {
	children: PropTypes.any,
	type: PropTypes.string.isRequired,
	color: PropTypes.string,
	textAlign: PropTypes.string,
	textTransform: PropTypes.string,
	textDecoration: PropTypes.string,
}