import PropTypes from 'prop-types'
import classes from './style.module.css'

export const Modal = ({
	children = {},
	maxWidth = 0,
	stateModal = [],
	onClose = () => { },
}) => {

	const [modal] = stateModal

	const style = {
		maxWidth: maxWidth || 'fit-content',
	}

	return modal.content && (
		<div className={classes.container}>
			<div className={classes.modal} style={style}>
				<span className={classes.close} onClick={onClose} />
				{children[modal.content]}
			</div>
		</div>
	)
}

Modal.propTypes = {
	children: PropTypes.object,
	maxWidth: PropTypes.number,
	stateModal: PropTypes.array.isRequired,
	onClose: PropTypes.func.isRequired,
}