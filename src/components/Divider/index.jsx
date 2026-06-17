import PropTypes from 'prop-types'
import theme from '../../utils/theme'

export const Divider = ({
	margin = '20px 0',
	borderStyle = 'solid',
	borderColor = 'primary',
	borderWidth = 1,
}) => {

	const style = {
		margin,
		borderStyle,
		borderWidth,
		borderColor: theme[borderColor],
	}

	return (
		<hr style={style} />
	)
}

Divider.propTypes = {
	margin: PropTypes.string,
	borderStyle: PropTypes.string.isRequired,
	borderColor: PropTypes.string,
	borderWidth: PropTypes.number,
}