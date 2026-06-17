import PropTypes from 'prop-types'
import classes from './style.module.css'
import theme, { contrast } from '../../utils/theme'

export const Badge = ({
	children,
	padding = '8px',
	margin = '4px',
	color = 'primary',
	borderRadius = '8px',
}) => {

	const style = {
		padding,
		margin,
		borderRadius,
		color: contrast(color),
		backgroundColor: theme[color],
	}

	return (
		<div className={classes.badge} style={style}>
			{children}
		</div>
	)
} 

Badge.propTypes = {
	children: PropTypes.any,
	padding: PropTypes.string,
	margin: PropTypes.string,
	color: PropTypes.string,
	borderRadius: PropTypes.string,
}