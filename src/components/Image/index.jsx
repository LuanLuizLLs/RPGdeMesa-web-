import PropTypes from 'prop-types'
import classes from './style.module.css'

export const Image = ({
	src = '',
	alt = '',
	margin = '',
	maxHeight = 0,
	maxWidth = 0,
}) => {

	const style = {
		margin,
		maxHeight,
		maxWidth,
	}

	return (
		<figure style={style}>
			<img className={classes.image} src={src} alt={alt} />
		</figure>
	)
}

Image.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	margin: PropTypes.string,
	maxHeight: PropTypes.number,
	maxWidth: PropTypes.number,
}