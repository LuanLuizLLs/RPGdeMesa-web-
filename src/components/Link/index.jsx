import PropTypes from 'prop-types'
import classes from './style.module.css'
import theme from '../../utils/theme'

export const Link = ({
	children,
	color = 'primary',
	href = null,
	target = '_self',
	textDecoration = '',
	onClick = () => { },
}) => {

	const style = {
		color: theme[color],
		textDecoration,
	}

	return (
		<a className={classes.link} href={href} target={target} onClick={onClick} style={style}>
			{children}
		</a>
	)
}

Link.propTypes = {
	children: PropTypes.any,
	color: PropTypes.string,
	href: PropTypes.string,
	target: PropTypes.string,
	textDecoration: PropTypes.string,
	onClick: PropTypes.func,
}